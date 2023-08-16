import { NextResponse } from "next/server"
import { verify, getNewAccessToken } from "@utils/token"
import { cookies } from 'next/headers'
import { REFRESH_TOKEN_COOKIE_NAME } from "@utils/token"
import { USER_NOT_AUTHORIZED } from "@constants/messages"
import { headers } from 'next/headers'



export async function POST(req) {
    const body = await req.json()
    const cookieStore = cookies()
    const headersList = headers()
    const {name, value: refresh_token} = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)!
    const access_token = headersList.get('Authorization')!

    const refreshTokenVerified = await verify(refresh_token, process.env.REFRESH_TK_SECRET!)
    const accessTokenVerfied = await verify(access_token, process.env.ACCESS_TK_SECRET!)

    console.log(accessTokenVerfied)

    const TokenError = !access_token || 
    accessTokenVerfied.error || !refreshTokenVerified || refreshTokenVerified.error


    if(refreshTokenVerified.expired){
        return NextResponse.json({ error: USER_NOT_AUTHORIZED }, {status: 401});
    }

    if (TokenError) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    const newAccessToken = 
    accessTokenVerfied.expired ? await getNewAccessToken(refreshTokenVerified.payload!) : null

    return NextResponse.json({message: "udało się stworzyć post", accessToken: newAccessToken}, {status: 200})
}