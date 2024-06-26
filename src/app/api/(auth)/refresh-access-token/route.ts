import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler from "../../../../lib/apiErrorHandler";
import { createSessionToken, decrypt, generalCookieOptions } from "../../../../lib/session";

interface DecodedPayload  {
    expiresAt: string;
    userId:string;
    [x:string]:any
}

export const _GET = async(req:NextRequest) => {

    const refresh_token = req.cookies.get("x-refresh-token")?.value;
    const session_token = req.cookies.get("x-session-token")?.value;

    if(!refresh_token && !session_token) return NextResponse.json({ message: 'Not Authorized' }, {status: 401 });

    const decodedRefreshToken = await decrypt<DecodedPayload>(refresh_token);
    const decodedSessionToken = await decrypt<DecodedPayload>(refresh_token);

    if( decodedRefreshToken === null || decodedSessionToken === null ) return NextResponse.json({ message: "Access Denied"}, {status: 403});

    const { expiresAt : refreshExpiryTime } = decodedRefreshToken;
    const { expiresAt : sessionExpiryTime, userId } = decodedSessionToken;

    if( new Date(refreshExpiryTime).getTime() <= Date.now()) return  NextResponse.json({ message: 'refresh_token expired' }, {status: 403 });
    if(!(new Date(sessionExpiryTime).getTime() <= Date.now())) return  NextResponse.json({ message: 'tokens are ok' });

    const new_session_token = await createSessionToken(userId);

    const res = NextResponse.json({message: "Session token refreshed"});

    res.cookies.set("x-session-token", new_session_token,generalCookieOptions());

    return res;


};

export const GET = apiErrorHandler(_GET);