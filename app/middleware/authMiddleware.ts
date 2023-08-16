import { NextResponse } from "next/server"
import { verify, getNewAccessToken } from "@utils/token"
import { cookies } from 'next/headers'
import { REFRESH_TOKEN_COOKIE_NAME } from "@utils/token"
import { headers } from 'next/headers'


export const authorize = async (req) =>{

    const cookieStore = cookies()
    const headersList = headers()

    const {name, value: refresh_token} = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)!
    const access_token = headersList.get('Authorization')!

    const [accessTokenVerfied, refreshTokenVerified] = await Promise.all([
        verify(access_token, process.env.ACCESS_TK_SECRET!),
        verify(refresh_token, process.env.REFRESH_TK_SECRET!)
    ])

    const TokenError = !access_token || 
    accessTokenVerfied.error || !refreshTokenVerified || refreshTokenVerified.error


    if(refreshTokenVerified.expired){
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (TokenError) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    
    const newAccessToken = 
    accessTokenVerfied.expired ? await getNewAccessToken(refreshTokenVerified.payload!) : null

    console.log(newAccessToken)

    req.access_token = newAccessToken

} 
