import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";

const ERROR_MESSAGE = "Error while fetching posts :(";

export async function GET(req: Request) {
  try {
    const headersList = headers();
    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const [userData] = await Promise.all([
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
    ]);

    const user = await db.user.findUnique({
      where: { id: userData.payload?.id },
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
    });

    console.log(user);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: ERROR_MESSAGE,
      },
      { status: 500 }
    );
  }
}
