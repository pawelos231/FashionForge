import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { Role } from "./role";

export type Token = {
  name: string;
  email: string;
  role: Role;
};

export enum TokenTypeEnum {
  refreshToken = "refreshToken",
  accessToken = "accessToken",
}

export type VerificationRequest = {
  payload: null | JWTPayload
  expired: boolean
  error: boolean  
}


export const FIFTEEN_MINUTES = 900;
export const TWO_WEEKS = 3600 * 24 * 14;
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
export const ACCESS_TOKEN_LOCAL_STORAGE_NAME = "access_token";

const EXPIRED_CODE = "ERR_JWT_EXPIRED"

export async function sign(
  payload: Token,
  secret: string,
  tokenType: TokenTypeEnum
): Promise<string> {
  const iat: number = Math.floor(Date.now() / 1000);

  //if refresh token then keep it for 14 days
  //if acess then keep it for 15 minutes

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

export async function verify(token: string, secret: string): Promise<VerificationRequest> {
  try {
    const { payload }: { payload: JWTPayload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return {payload: null, error: false, expired: true};
    }

    return {payload, error: false, expired: false};
  } catch (error) {
    if(error.code === EXPIRED_CODE){
      return {payload: null, error: false, expired: true};
    }
    return {payload: null, error: true, expired: false};
  }
}


export const getNewAccessToken = async (refreshToken: JWTPayload): string => {
  if(!refreshToken) throw new Error("no refresh token provided")
  const {email, name, role} = refreshToken as Token

  const claims: Token = {
    email,
    name,
    role,
  };

  const accessJWT = await sign(claims, process.env.ACCESS_TK_SECRET!, TokenTypeEnum.accessToken)
  return accessJWT
  
}