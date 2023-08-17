import { db } from "@lib/db";
import { NextResponse } from "next/server";
import * as yup from "yup";

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
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
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
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGE,
      },
      { status: 500 }
    );
  }
}
