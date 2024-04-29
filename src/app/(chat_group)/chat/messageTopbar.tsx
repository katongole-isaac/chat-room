import React from "react";
import Avatar, { OnlineAvatar } from "../../../components/common/avatar";

export default function MessageTopBar() {
  return (
    <div className="h-full border-">
      <div className="h-full flex items-center justify-between px-2 ">
        {/* avatar with Online status */}
        <div className="flex h-full items-center justify-center gap-3">
          <OnlineAvatar avatarWrapperClassname="w-10 h-10" />

          <div className="flex flex-col ">
            <span className="font-medium relative top-1"> Username</span>
            <span className="text-sm dark:text-gray-300"> online</span>
          </div>
        </div>
      </div>
    </div>
  );
}


