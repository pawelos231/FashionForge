import { db } from "@lib/db";
import { NextResponse } from "next/server";
import * as yup from "yup";
import { PAGES_TO_FETCH } from "@constants/config";

const ERROR_MESSAGE = "Error while fetching posts :(";

export async function GET(req: Request) {
  const schema = yup.object({
    limit: yup.string().required(),
    page: yup.string().required(),
  });

  try {
    const url = new URL(req.url);

    const { limit, page } = schema.validateSync({
      limit: url.searchParams.get("limit")!,
      page: url.searchParams.get("page")!,
    });

    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            photoLink: true,
            createdAt: true,
            role: true,
            commentsLikes: true,
            postLikes: true,
          },
        },
        comments: true,
        votes: true,
      },
      skip: Number(page) * Number(limit),
      take: PAGES_TO_FETCH,
    });

    return NextResponse.json(
      posts,

      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGE,
      },
      { status: 500 }
    );
  }
}
