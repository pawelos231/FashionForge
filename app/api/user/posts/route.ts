import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";
import * as yup from "yup";

const ERROR_MESSAGE = "Error while fetching posts :(";

const schema = yup.object({
  limit: yup.string().required(),
  page: yup.string().required(),
});

export async function GET(req: Request) {
  try {
    const headersList = headers();
    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const url = new URL(req.url);
    const { limit, page } = schema.validateSync({
      limit: url.searchParams.get("limit")!,
      page: url.searchParams.get("page")!,
    });

    const [userData] = await Promise.all([
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
    ]);

    if (!userData.payload) {
      return NextResponse.json(
        { error: "Authorization failed" },
        {
          status: 401,
        }
      );
    }

    const posts = await db.post.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: { authorId: userData.payload?.id },
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
