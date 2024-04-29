import React from "react";
import Avatar from "../../../components/common/avatar";

export default function ChatList() {
  return (
    <div className="hover:bg-[#dfdfe1] hover:dark:bg-dark-100 cursor-pointer">
      <div className=" w-full p-1 px-2 flex items-center gap-2 overflow-x-hidden">
        <div className="">
          <Avatar avatarTheme="default" />
        </div>

        <div className="flex-1 flex flex-col justify-between dark:text-gray-400">
          <div className="flex pr-1  justify-between">
            <span
              className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[210px] dark:text-gray-300 "
              title="username"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
            <span className="max-w-14">3d</span>
          </div>

          {/* message */}
          <div className="max-w-[255px] ">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis  text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, impedit, libero autem officia nemo beatae aperiam
              facere esse harum nulla rerum adipisci iure quos totam minima odio
              et laborum similique!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
