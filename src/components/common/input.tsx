import React from "react";

interface InputProps {
  error: "";
}
export default function Input() {
  return (
    <div className="m-72">
      <div className="flex flex-col gap-1 ">
        <input
          type="text"
          className="border border-stone-400  outline-2 outline-offset-[2.5px]   outline-blque-200 outline-rose-400 rounded-sm px-2 p-[2px]"
        />
        <p className="text-xs text-rose-500"> Error has occurred</p>
      </div>
    </div>
  );
}
