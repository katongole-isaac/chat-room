import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = process.env.NEXTAUTH_SECRET
const encodedKey = new TextEncoder().encode(secret);

export const encrypt = (payload:{[x:string]: any}) => new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(encodedKey)

export const decrypt = async (token:string) => {
    try
    {
        const {payload} = await jwtVerify(token, encodedKey,{
          algorithms: ["HS256"]        
     });

    return payload

    }catch(ex) {
        console.error("[JWT Decrypt]: ", ex);
        throw new Error(ex);
    }

}

export const createSession = async(userId:string) => {

    const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14days
    const session = await encrypt({ userId, expiresAt });
 
    cookies().set('next-auth.session-token',session, {
        path: "/",
        secure: true,
        httpOnly:true,
        sameSite: "lax",
        expires: expiresAt
    })

}