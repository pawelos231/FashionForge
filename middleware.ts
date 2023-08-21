import {
  verify,
  REFRESH_TOKEN_COOKIE_NAME,
  getNewAccessToken,
} from "@utils/token";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  try {
    let { name, value: refresh_token } = req.cookies.get(
      REFRESH_TOKEN_COOKIE_NAME
    );
    const access_token: string = req.headers.get("Authorization");

    const [accessTokenVerified, refreshTokenVerified] = await Promise.all([
      verify(access_token, process.env.ACCESS_TK_SECRET!),
      verify(refresh_token || "", process.env.REFRESH_TK_SECRET!),
    ]);

    const tokenError =
      !access_token ||
      accessTokenVerified.error ||
      !refreshTokenVerified ||
      refreshTokenVerified.error;

    if (refreshTokenVerified.expired || tokenError) {
      return NextResponse.json(
        { error: "Authorization failed" },
        {
          status: 401,
        }
      );
    }

    const newAccessToken = accessTokenVerified.expired
      ? await getNewAccessToken(refreshTokenVerified.payload!)
      : null;

    const acObj = newAccessToken
      ? { accessToken: newAccessToken, changed: true }
      : { accessToken: access_token, changed: false };

    const response = NextResponse.next();
    response.headers.set("access_token", JSON.stringify(acObj));
    return response;
  } catch (err) {
    console.error("Authorization error:", err);
    return NextResponse.json(
      { error: "Authorization failed" },
      {
        status: 401,
      }
    );
  }
}

export const config = {
  matcher: [
    "/api/posts/create",
    "/api/posts/vote",
    "/api/auth/token",
    "/api/user/:path*",
  ],
};
