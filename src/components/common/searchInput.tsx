"use client";

import React, { useRef } from "react";
import { MdSearch } from "react-icons/md";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <div className="w-full ">
      <div className="flex  relative">
        <div className="absolute top-[3px] left-1 px-1   ">
          <MdSearch
            className="text-gray-500 text-2xl cursor-pointer"
            onClick={() => inputRef.current.focus()}
          />
        </div>
        <input
          ref={inputRef}
          type="search"
          id="search_"
          placeholder="search chats"
          className={`border flex-1 pl-9  outline-2 outline-offset-[2.5px] rounded-md px-2 p-[2px]  dark:outline-offset-[1px] dark:outline-none
                    outline-gray-300 border-stone-400 dark:focus:outline-gray-700
                `}
        />
      </div>
    </div>
  );
}
