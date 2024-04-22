"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .regex(
      new RegExp(/^(?=.*[A-Za-z])[A-Za-z\d_-]{3,30}$/),
      "Please ensure that your username only contains letters, digits, underscores, or hyphens"
    ),
  password: z
    .string()
    .regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,}$/), {
      message:
        "Please ensure that your password contains at least 6 characters, including at least one digit",
    }),
});

export default function SignUp() {
  const [hideAndShowPassword, setHideAndShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
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
               ${
                 "username" in errors
                   ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400 "
                   : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700"
               }  `}
            />
            {errors?.username?.message && (
              <p className="text-xs text-rose-500">
                {errors?.username?.message as string}
              </p>
            )}
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
               ${
                 "email" in errors
                   ? " outline-rose-400 border-rose-400 dark:border-rose-400 dark:focus:outline-rose-400"
                   : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700"
               }  `}
            />
            {errors?.email?.message && (
              <p className="text-xs text-rose-500">
                {errors?.email?.message as string}
              </p>
            )}
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
                    : " outline-blue-200border-stone-400 dark:focus:outline-gray-700"
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
              className="py-1 px-1 border w-full rounded-md"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
