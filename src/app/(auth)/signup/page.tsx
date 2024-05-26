"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import http from "../../../service/http";
import config from "../../../configs/default.json";
import { signupSchema } from "../../../lib/mongo/schemas";
import {  redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const USERNAME_ERROR_CODE = 1;
const EMAIL_ERROR_CODE = 2;

export default function SignUp() {

  const router = useRouter();

  const [isLoading , setIsLoading] = useState(false);
  const [hideAndShowPassword, setHideAndShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState({ message: "", code: 0 });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: FieldValues) => {
    
    setIsLoading(true);
    setSignUpError( prev => ({...prev, code: 0, message: ""}))

    http
      .post(config.signup, data)
      .then( () => {

        //  signIn("credentials",{
          
        //   email: data?.email,
        //   password: data?.password 

        // })
        // .then(res => {
          
        //   if(res.status <= 200 && res.status <= 299 && !res.error)console.log("here")
        //     // router.replace("/chat");

        // })
       
      })
      .catch((ex) => {
        console.error("error: ", ex);

        if(ex && ex?.response && ex?.response?.data) 
          setSignUpError({ code : ex.response.data.code , message: ex.response.data.message })


      })
      .finally(() => setIsLoading(false) );

  };

   useEffect(() => {

    if(!signUpError.message) return;

    const timerId = setTimeout( () => setSignUpError( prev => ({...prev, code: 0, message: ""})) , 3000);

    return () => clearInterval(timerId);

  },[signUpError]);


  return (
    <div className="">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        autoComplete="off"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="usrname" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              id="usrname"
              className={`border  outline-2 outline-offset-[2.5px] rounded-md px-2 p-[2px]  dark:outline-offset-[1px] dark:outline-none
              ${signUpError.message && signUpError.code == USERNAME_ERROR_CODE ? "animate-shake border-2" : "" }

               ${
                 "username" in errors || (signUpError.message && signUpError.code == USERNAME_ERROR_CODE )
                   ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400 "
                   : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700"
               }  `}
            />
            {
              signUpError.message && signUpError.code == USERNAME_ERROR_CODE  ? (<p className="text-xs text-rose-500"> {signUpError.message} </p>):
              errors?.username?.message && ( <p className="text-xs text-rose-500"> {errors?.username?.message as string}</p>)
           }


          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              className={`border outline-2 outline-offset-[2.5px] rounded-md px-2 p-[2px] dark:outline-offset-[1px] dark:outline-none
              ${signUpError.message && signUpError.code == EMAIL_ERROR_CODE ? "animate-shake border-2" : "" }
               ${
                 "email" in errors || (signUpError.message && signUpError.code == EMAIL_ERROR_CODE )
                   ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400"
                   : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700"
               }  `}
            />

             {
              signUpError.message && signUpError.code == EMAIL_ERROR_CODE  ? (<p className="text-xs text-rose-500"> {signUpError.message} </p>):
              errors?.email?.message && ( <p className="text-xs text-rose-500"> {errors?.email?.message as string}</p>)
           }
           
          </div>

          <div className="flex flex-col gap-1 ">
            <label htmlFor="passwd" className="text-sm font-medium">
              Password
            </label>
            <div className="flex gap-1 items-center relative">
              <input
                type={hideAndShowPassword ? "text" : "password"}
                {...register("password")}
                id="passwd"
                className={`border w-full pr-8  outline-2 outline-offset-[2.5px] dark:outline-offset-[1px] dark:outline-none ${
                  "password" in errors 
                    ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400"
                    : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700"
                }  rounded-md px-2 p-[2px]`}
              />
              {hideAndShowPassword ? (
                <FaEyeSlash
                  className="absolute right-0 cursor-pointer mr-2 text-gray-500"
                  onClick={() => setHideAndShowPassword((prev) => !prev)}
                />
              ) : (
                <FaRegEye
                  className="absolute right-0 cursor-pointer mr-2 text-gray-500"
                  onClick={() => setHideAndShowPassword((prev) => !prev)}
                />
              )}
            </div>
            {errors?.password?.message && (
              <p className="text-xs text-rose-500">
                {errors?.password?.message as string}
              </p>
            )}
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={Boolean(isLoading)}
              className="py-1 px-1 border border-white/40 w-full rounded-md disabled:bg-white/5  disabled:border-white/5 disabled:cursor-not-allowed"
            >
              <span className={`${isLoading ? "opacity-40" : ""} `} >Sign up </span>  

            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
