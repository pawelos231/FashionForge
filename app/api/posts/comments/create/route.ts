import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";
import { CommentRequest } from "@lib/validators/comment";

const ERROR_MESSAGE = "Error while adding comment";

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const [userData, { text, postId }] = await Promise.all([
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
      req.json() as Promise<CommentRequest>,
    ]);

    const comment = await db.comment.create({
      data: {
        content: text,
        postId: postId,
        userId: userData.payload?.id!,
      },
    });

    return NextResponse.json(
      { message: "successfuly added comment" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: ERROR_MESSAGE,
      },
      { status: 500 }
    );
  }
}
