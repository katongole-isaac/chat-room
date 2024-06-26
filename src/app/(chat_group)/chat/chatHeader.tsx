import dynamic from "next/dynamic";
import React from "react";
import Logout from "../../(_auth)/logout/logout";

const ThemeButton = dynamic(() => import("../../../components/themeSwticher"));

export default function ChatHeader() {
  return (
    <div className="px-3 h-full">
      <div className="h-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages </h1>

        <div className="flex gap-0 justify-center items-center">
        <ThemeButton />
        <Logout />
        </div>
      </div>
    </div>
  );
}
