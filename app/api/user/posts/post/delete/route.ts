import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";

const ERROR_MESSAGE = "Error while adding bio :(";

export async function DELETE(req: Request) {
  try {
    const headersList = headers();
    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const [userData, { postId }] = await Promise.all([
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
      req.json(),
    ]);

    await db.post.delete({
      where: {
        id: postId,
        authorId: userData.payload?.id,
      },
    });

    return NextResponse.json(
      { message: "successfuly deleted post" },
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
