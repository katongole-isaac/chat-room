import React from "react";
import MessageInput from "./messageInput";
import dynamic from "next/dynamic";
import ChatPanel from "./chatPanel";
import { _getServerSession } from "../../api/auth/[...nextauth]/nextauthOptions";

const ThemeSwitch = dynamic(() => import("../../../components/themeSwticher"), {
  ssr: false,
});
export default async function ChatPage() {

  const s = await _getServerSession();
  console.log("Session: ",s);
  
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
