import { db } from "@lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";

const ERROR_MESSAGE = "Error while adding bio :(";

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const { accessToken, changed } = JSON.parse(
      headersList.get("access_token")!
    ) as AccessTokenHeaderType;

    const [userData, { bio }] = await Promise.all([
      verify(accessToken, process.env.ACCESS_TK_SECRET!),
      req.json(),
    ]);

    const co = await db.user.update({
      where: {
        id: userData.payload?.id,
      },
      data: {
        description: bio,
      },
    });

    console.log(co);

    return NextResponse.json(
      { message: "successfuly added bio" },
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
