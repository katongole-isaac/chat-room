import { NextRequest, NextResponse } from "next/server";
import { Signup } from "../../../../lib/mongo/schemas";
import User, { validateUserDto } from "../../models/user";
import apiErrorHandler from "../../../../lib/apiErrorHandler";
import { hashPassword } from "../../../../lib/hashPassword";


 async function _POST(req: NextRequest) {

  const userInput: Required<Signup> = await req.json();

  const { data, error } = validateUserDto(userInput);

  if (error && Object.keys(error).length)  return NextResponse.json({ message: error }, { status: 400 });

  const { username, email, password } = data;

  const emailInUse = await User.findOne({ email });
  
  if(emailInUse) return NextResponse.json({message: "Email already in use", code: 2}, {status: 400 });

  const usernameInUse = await User.findOne({ username });
  
  if(usernameInUse) return NextResponse.json({message: "Username already in use", code : 1}, {status: 400 });

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    ...data,
    password: hashedPassword
  });

  await newUser.save();
  
  return NextResponse.json({});
}

export const POST = apiErrorHandler(_POST);