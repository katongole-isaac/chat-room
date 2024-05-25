/**
 * This contains message UI component
 */

"use client";

import React, { useImperativeHandle, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { MdReply } from "react-icons/md";
import Avatar from "../../../components/common/avatar";

interface Props {
  message: string;
}

const Message = React.forwardRef<any, Props>((props, ref) => {
  const { message } = props;

  // const _messageRef = useRef<HTMLDivElement>(null);

  // useImperativeHandle(
  //   ref,
  //   () => {
  //     return {
  //       getMessageHeight: () => _messageRef.current.scrollHeight,
  //     };
  //   },
  //   []
  // );

  return (
    <div ref={ref} className="">
      <div className="flex gap-2 px-2 py-2 items-center w-full rounded-sm hover:backdrop-brightness-50 hover:bg-white/95 hover:dark:bg-dark-100  ">
        <div className="px-1 self-start">
          <Avatar avatarTheme="purple" avatarWrapperClassname="h-8 w-8" />
        </div>

        {/* the message */}
        <div className="relative w-full group">
          {/* option */}
          <div className="group-hover:flex hidden absolute min-w-16 h-7  shadow-md dark:shadow-md  rounded-sm right-2 -top-3 px-1 items-center gap-1 bg-white dark:bg-dark-100/70 ">
            <MdReply />
            <MdReply />
          </div>

          {/* username and Date */}
          <div className="flex flex-col gap-1 ">
            <div className="flex gap-1 items-center">
              <span className="text-sm hover:underline font-medium cursor-pointer">
                username
              </span>
              <span className="text-xs dark:text-gray-300 ">
                {new Date().toLocaleString()}{" "}
              </span>
            </div>
          </div>

          {/* message */}
          <div className="font-normal pt-1">
            <pre className="text-wrap font-sans"> {message}</pre>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Message;
