/**
 * This file receives the user_token, decodes it and return the user details.
 * Helps to persist authenticated user data incase the localstorage is cleared.
 * The app simplify makes a request to this endpoint.
 * 
 */

import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler from "../../../../lib/apiErrorHandler";
import { decrypt } from "../../../../lib/session";
import User from "../../models/user";

const _GET = async (req: NextRequest) => {

    const _sessionToken = req.cookies.get("x-session-token");
    if(!_sessionToken) return NextResponse.json({ message: "Not Authorized" }, {status: 401 });

    const decoded = await decrypt(_sessionToken.value);

    if(decoded === null) return  NextResponse.json({message: "Access Denied"}, {status: 403 });

    const user = await User.findOne({_id: decoded.userId});

    const _user = {username: user.username, id: user._id, email: user.email }

    return NextResponse.json({ user: _user });

};


export const GET = apiErrorHandler(_GET);