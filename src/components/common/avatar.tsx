/**
 * This file contains avatar setup for the app.
 *
 */

import React from "react";
import { FaUser } from "react-icons/fa";

const _avatarThemes = {
  default: "bg-amber-600 text-light-300 border-amber-600",
  purple:
    "bg-purple-600 text-light-300/100 border-purple-600 dark:bg-purple-600/80 text-light-300/90 ",
  green: "bg-green-400 text-gray-50 border-green-400",
};

export type AvatarTheme = keyof typeof _avatarThemes;

interface AvatarProps {
  avatarTheme?: AvatarTheme;

  /**
   * - Styles for the avatart itself
   */
  avatarClassname?: string;
  /**
   * - Styles for the avatar div wrapper
   */
  avatarWrapperClassname?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  avatarTheme = "default",
  avatarClassname,
  avatarWrapperClassname,
}) => {
  return (
    <div
      className={`relative border ${_avatarThemes[avatarTheme]} h-12 w-12  rounded-full flex justify-center items-center overflow-hidden ${avatarWrapperClassname} `}
    >
      <FaUser
        className={`relative top-1 scale-[.85] text-[300%] ${avatarClassname}`}
      />
    </div>
  );
};
export default Avatar;

export const OnlineAvatar: React.FC<AvatarProps> = (props) => {
  const { avatarWrapperClassname } = props;

  const offline = (
    <div className="w-[14px] h-[14px] rounded-full absolute dark:bg-neutral-500 bg-neutral-300 right-[0.5px] bottom-1 z-20 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-neutral-500 dark:bg-neutral-700 "></div>
    </div>
  );

  const online = (
    <div className="w-[14px] h-[14px] rounded-full absolute dark:bg-neutral-700 bg-neutral-300 right-[0.5px] bottom-1 z-20 flex items-center justify-center ">
      <div className="w-[11px] h-[11px] rounded-full bg-green-500 dark:bg-green-500 "></div>
    </div>
  );
  return (
    <div className="relative">
      {offline}
      <Avatar
        {...props}
        avatarWrapperClassname={`border-4 border-neutral-300/80 dark:border-neutral-700 ${avatarWrapperClassname}`}
      />
    </div>
  );
};
