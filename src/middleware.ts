import { NextRequest, NextResponse } from "next/server";

export default function (req: NextRequest) {

    const currentUser = req.cookies.get('x-session-token')?.value

     if (currentUser && req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) 
        return NextResponse.redirect(new URL('/chat', req.url))
 
    if (currentUser && !req.nextUrl.pathname.startsWith('/chat')) 
        return NextResponse.redirect(new URL('/chat', req.url))
    
    if (!currentUser && !req.nextUrl.pathname.startsWith('/login')) 
        return NextResponse.redirect(new URL(`/login?cb=${req.nextUrl.pathname}`, req.url))
  
    console.log("Running middleware on: ", req.url);
    const res = NextResponse.next();

    return res;
}

export const config = {
    matcher: ['/chat/:path', '/login', '/signup']
}