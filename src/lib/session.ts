import { SignJWT, jwtVerify } from 'jose';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const secret = process.env.NEXTAUTH_SECRET
const encodedKey = new TextEncoder().encode(secret);
const SESSION_TOKEN_EXPIRY_TIME = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14days
export const REFRESH_TOKEN_EXPIRY_TIME = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30days

export const encrypt = (payload:{[x:string]: any}) => new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(encodedKey)

export const decrypt = async <T>(token:string) => {
   
    try {

        const {payload} = await jwtVerify<T>(token, encodedKey,{
            algorithms: ["HS256"]        
         });

        return payload

    }catch(ex) {

        console.error("[JWT DECRYPT ERROR]: ",ex);

        return null;
    }


}

export const generalCookieOptions : (arg?:Pick<ResponseCookie, "expires" >)=>({[key:string]:any}) = (arg) => ({
        path: "/",
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly:process.env.NODE_ENV === 'production' ? true : false,
        sameSite: "lax",
        expires: SESSION_TOKEN_EXPIRY_TIME,
        ...arg
    });

export const createRefreshToken = async(userId:string) =>  await encrypt({ userId, expiresAt: REFRESH_TOKEN_EXPIRY_TIME });
export const createSessionToken = async(userId:string) =>  await encrypt({ userId, expiresAt: SESSION_TOKEN_EXPIRY_TIME });

export const createSession = async(userId:string) =>  {

    const refresh_token = await createRefreshToken(userId);
    const session_token = await createSessionToken(userId);

    return {session_token, refresh_token};
}
