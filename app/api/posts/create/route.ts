import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PostRequest } from "@lib/validators/postCreation";
import { verify } from "@utils/token";
import { db } from "@lib/db";

type AccessTokenHeaderType = {
  changed: boolean;
  accessToken: string;
};

type ExtendedPostRequest = {};

export async function POST(req, res) {
  const headersList = headers();
  const { accessToken, changed } = JSON.parse(
    headersList.get("access_token")!
  ) as AccessTokenHeaderType;

  const [body, userData] = await Promise.all([
    req.json() as PostRequest,
    verify(accessToken, process.env.ACCESS_TK_SECRET!),
  ]);

  if (!userData.payload)
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  const newPost = await db.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userData.payload.id,
    },
  });

  return NextResponse.json(
    {
      message: "udało się stworzyć post",
      accessToken: changed ? accessToken : null,
      post: newPost,
    },
    { status: 200 }
  );
}
