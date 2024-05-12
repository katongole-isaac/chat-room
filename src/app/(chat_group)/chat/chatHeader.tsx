import dynamic from "next/dynamic";
import React from "react";

const ThemeButton = dynamic(() => import("../../../components/themeSwticher"));

export default function ChatHeader() {
  return (
    <div className="px-3 h-full">
      <div className="h-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Messages </h1>
        <ThemeButton />
      </div>
    </div>
  );
}
