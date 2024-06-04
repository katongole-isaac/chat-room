"use client";

import { z } from "zod";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import http from "../../../service/http";
import config from '../../../configs/default.json';

const schema = z.object({
  email: z
    .string()
    .min(
      3,
      "Please ensure that your username or email contains at least 3 characters."
    ),
  password: z
    .string()
    .min(1, { message: "Please ensure that a password is provided" }),
});

export default function Login() {

  const router = useRouter();

  const [hideAndShowPassword, setHideAndShowPassword] = useState(false);
  const [isLoading , setIsLoading ] = useState(false);
  const [loginError, setLoginError] = useState({message: ""});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {

    setIsLoading(true);
    setLoginError( prev => ({...prev, message: ""}))

    http.post(config.login , data)
    .then(res => {
      console.log("res: ", res);
      
    })
    .catch(ex => {
      setLoginError( prev => ({...prev, message: "Incorrect credentials" }));
      console.log(ex);

    })
    .finally( () => setIsLoading(false));

  };

 useEffect(() => {

    if(!loginError.message) return;

    const timerId = setTimeout( () => setLoginError( prev => ({...prev, message: ""})) , 3000);

    return () => clearInterval(timerId);

  },[loginError]);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) =>    onSubmit(data)
        )}
        autoComplete="off"
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="text-sm font-medium">
              Username or Email{" "}
            </label>
            <input
              type="text"
              {...register("email")}
              id="email"
              className={`border outline-2 outline-offset-[2.5px] dark:outline-offset-[1px] dark:outline-none  ${loginError.message ? "animate-shake border-2" : ""} 
              ${
                "email" in errors || loginError.message
                  ? " outline-rose-400  border-rose-400  dark:border-rose-400 dark:focus:outline-rose-400 "
                  : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700 "
              }    rounded-md px-2 p-[2px]
            `}
            />
            {errors?.email?.message && (
              <p className="text-xs text-rose-600">
                {errors?.email?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="passwd" className="text-sm font-medium">
              Password
            </label>
            <div className="flex gap-1 items-center  relative">
              <input
                type={hideAndShowPassword ? "text" : "password"}
                {...register("password")}
                id="passwd"
                className={`border w-full pr-8  outline-2 outline-offset-[2.5px] dark:outline-offset-[1px] dark:outline-none  ${loginError.message ? "animate-shake border-2" : ""}  ${
                  "password" in errors || loginError.message
                    ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400 "
                    : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700 "
                }   rounded-md px-2 p-[2px]  `}
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
              className={`py-1 px-1 border border-white/50 w-full flex justify-center items-center rounded-md disabled:bg-white/5  disabled:border-white/5 disabled:cursor-not-allowed `}
            >
               <span className={`${isLoading ? "opacity-40" : ""} `} >Log in </span>  
             
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
