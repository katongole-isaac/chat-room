import React from "react";
import NavLink, { AuthTitle } from "./authSubComponent";
import dynamic from "next/dynamic";

const DynmaicThemeSwitcher = dynamic(
  () => import("../../components/themeSwticher"),
  { ssr: false }
);

export default function AuthLayout({ children, params }) {
  console.log(params);
  return (
    <div className=" h-screen  relative">
      <div className=" w-full flex flex-col gap-4 pb-6 justify-center items-center ">
        <div className="border border-gray-400 rounded-md w-[22rem]  mt-20 min-h-[25rem] px-7 py-7 ">
          <div className=" mb-5">
            <h1>Logo</h1>
          </div>

          <AuthTitle />

          <div className="w-full">{children}</div>
        </div>

        <div className="font-medium">
          <NavLink />
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <DynmaicThemeSwitcher />
      </div>
    </div>
  );
}
