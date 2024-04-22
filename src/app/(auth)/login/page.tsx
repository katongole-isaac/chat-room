"use client";

import { z } from "zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .min(
      3,
      "Please ensure that your username or email contains at least 3 characters."
    ),
  password: z
    .string()
    .regex(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,}$/), {
      message:
        "Please ensure that your password contains at least 6 characters, including at least one digit",
    }),
});

export default function Login() {
  const [hideAndShowPassword, setHideAndShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

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
            <label htmlFor="email" className="text-sm font-medium">
              Username or Email{" "}
            </label>
            <input
              type="text"
              {...register("email")}
              id="email"
              className={`border outline-2 outline-offset-[2.5px] dark:outline-offset-[1px] dark:outline-none 
              ${
                "email" in errors
                  ? " outline-rose-400  border-rose-400  dark:border-rose-400 dark:focus:outline-rose-400 "
                  : " outline-blue-200 border-stone-400 dark:focus:outline-gray-700 "
              }    rounded-md px-2 p-[2px]
            `}
            />
            {errors?.email?.message && (
              <p className="text-xs text-rose-600">
                {" "}
                {errors?.email?.message as string}{" "}
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
                className={`border w-full pr-8  outline-2 outline-offset-[2.5px] dark:outline-offset-[1px] dark:outline-none  ${
                  "password" in errors
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
              className="py-1 px-1 border w-full rounded-md"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
