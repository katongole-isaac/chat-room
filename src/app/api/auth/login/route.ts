import { NextRequest, NextResponse } from "next/server";
import apiErrorHandler from "../../../../lib/apiErrorHandler";
import User, { UserLogin, validateUserLoginDto } from "../../models/user";
import { verifyPassword } from "../../../../lib/hashPassword";
import { createSession, generalCookieOptions } from "../../../../lib/session";

async function _POST(req: NextRequest) {
    
    const userInput: UserLogin = await req.json();

    const { data, error } = validateUserLoginDto(userInput);

    if (error && Object.keys(error).length)  return NextResponse.json({ message: error }, { status: 400 });

    const { email, password } = data;

    const emailRegExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

    const isEmailOrUsername = emailRegExp.test(email);

    let user:any ;
     
    if(isEmailOrUsername)
      user = await User.findOne({ email })
    else
      user = await User.findOne({ username: email  });

    if(!user) return NextResponse.json({ message: "Incorrect credentials" },{status: 400});

    const { password: hash, _id  } = user;

    const isValidPassword = await verifyPassword(hash, password);

    if(!isValidPassword) return NextResponse.json({ message: "Incorrect credentials" },{status: 400});
    
    const { email:_email, username } = user;


    const _sessionToken = await createSession(_id.toString());
    
    const res = NextResponse.json({ email: _email, username, id: _id });

    res.cookies.set("x-session-token", _sessionToken, generalCookieOptions());

    return res;

}


export const POST = apiErrorHandler(_POST);