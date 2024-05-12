import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./mongo/db";


export default function (handler: (...arg:{[key:string]:any}[])=> Promise<any>) {

   return async (req:NextRequest, ...args:{[x:string]:any}[]) => {

     try {

       await dbConnect();

       return  await  handler(req, args);

    } catch (error) {

        console.error("\x1b[31m; An error occurred: %s \x1b[0m;", error);

        return NextResponse.json({message: {code: error?.code, message: error?.message}}, {status: 500});
        
        }
   }
}