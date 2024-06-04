import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.NEXTAUTH_SECRET
const encodedKey = new TextEncoder().encode(secret);
const EXPIRES_AT = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14days

export const encrypt = (payload:{[x:string]: any}) => new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(encodedKey)

export const decrypt = async (token:string) => {
   
    try {

        const {payload} = await jwtVerify(token, encodedKey,{
            algorithms: ["HS256"]        
         });

        return payload

    }catch(ex) {

        console.error("[JWT DECRYPT ERROR]: ",ex);

        return null;
    }


}

export const generalCookieOptions : ()=>({[key:string]:any}) = () => ({
        path: "/",
        secure: true,
        httpOnly:true,
        sameSite: "lax",
        expires: EXPIRES_AT
    });

export const createSession = async(userId:string) =>  await encrypt({ userId, expiresAt: EXPIRES_AT });
 