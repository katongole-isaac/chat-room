"use client";

import React from "react";
import { useTheme } from "next-themes";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export default function ThemeSwticher() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="w-10 h-10 rounded-full flex text-2xl  hover:bg-lightHover  dark:hover:bg-darkHover justify-center items-center "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
    </button>
  );
}
