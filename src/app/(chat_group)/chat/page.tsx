import React from "react";
import MessageInput from "./messageInput";
import dynamic from "next/dynamic";
import ChatPanel from "./chatPanel";

const ThemeSwitch = dynamic(() => import("../../../components/themeSwticher"), {
  ssr: false,
});
export default function ChatPage() {
  return (
    <div className="h-screen">
      {/* <ThemeSwitch  />
      <div className="max-w-[400px] m-auto py-52">
        <MessageInput />
      </div> */}
      <ChatPanel />
    </div>
  );
}
