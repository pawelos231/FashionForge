import { cookies } from "next/headers";
import { REFRESH_TOKEN_COOKIE_NAME } from "./token";
import { verify } from "./token";

export const getUserDataServer = async () => {
  const cookieStore = cookies();
  let refresh_token = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const [refreshTokenVerified] = await Promise.all([
    verify(refresh_token || "", process.env.REFRESH_TK_SECRET!),
  ]);
  return refreshTokenVerified;
};
