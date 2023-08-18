import { headers } from "next/headers";
import { AccessTokenHeaderType } from "@utils/token";
import { verify } from "@utils/token";
import { NextResponse } from "next/server";

const ERROR_MESSAGE = "Error while fetching posts :(";

export async function GET(req: Request) {
  const headersList = headers();
  const { accessToken, changed } = JSON.parse(
    headersList.get("access_token")!
  ) as AccessTokenHeaderType;

  const userData = await verify(accessToken, process.env.ACCESS_TK_SECRET!);

  if (!userData.payload) {
    return NextResponse.json(
      { error: "Authorization failed" },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json({
    userData: userData.payload,
    accessToken: changed ? accessToken : null,
  });
}
