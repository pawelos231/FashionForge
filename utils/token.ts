import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export type Token = {
  name: string;
  email: string;
  photo: string;
};

export enum TokenTypeEnum {
  refreshToken = "refreshToken",
  accessToken = "accessToken",
}

export async function sign(
  payload: Token,
  secret: string,
  tokenType: TokenTypeEnum
): Promise<string> {
  const iat: number = Math.floor(Date.now() / 1000);

  //if refresh token then keep it for 14 days
  //if acess then keep it for 15 minutes

  const FIFTEEN_MINUTES = 900;
  const TWO_WEEKS = 3600 * 24 * 14;

  const exp: number =
    TokenTypeEnum.accessToken == tokenType
      ? iat + FIFTEEN_MINUTES
      : iat + TWO_WEEKS;

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string): Promise<any> {
  const { payload }: { payload: JWTPayload } = await jwtVerify(
    token,
    new TextEncoder().encode(secret)
  );

  return payload;
}
