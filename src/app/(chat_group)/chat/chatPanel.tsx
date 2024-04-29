"use client";

import React, {  useRef, useState } from "react";
import MessageInput from "./messageInput";
import Message from "./message";
import dynamic from "next/dynamic";
import ChatListings from "./chatListings";
import MessageTopBar from "./messageTopbar";

const Theme = dynamic(() => import("../../../components/themeSwticher"));

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (msg: string) => {
    console.log("msg: ", msg);

    console.log(messageRef.current);

    setMessages((prev) => [msg, ...prev]);

    messageContainerRef.current.scrollTo({
      top: messageContainerRef.current.scrollHeight + messageContainerRef.current.lastElementChild?.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-[1200px] m-auto border-x dark:border-x-gray-700 h-full ">
      {/* <Theme /> */}

      <div className="flex gap-1 h-full ">
        {/* chat listings */}
        <div className="basis-[22rem] border-r dark:border-r-gray-700 overflow-x-hidden">
          <ChatListings />
        </div>

        {/* message section */}
        <div className="relative flex-1 h-full flex flex-col">
          {/* message top bar */}
          <div className="min-h-20 border-b dark:border-b-gray-700">
            <MessageTopBar />
          </div>

          {/* messages */}
          <div
            ref={messageContainerRef}
            className="flex-1 border overflow-y-auto custom-scrollbar border-amber-500 flex flex-col-reverse gap-4 mb-3 py-3"
          >
            {messages.map((msg, i) => (
              <Message key={i} message={msg} ref={messageRef} />
            ))}
          </div>

          {/* placeholder for the absolutely position element */}
          <div className="h-20"></div>
          <div className="absolute bottom-0 w-full dark:bg-dark shadow-md min-h-20 border-t dark:border-t-gray-700 flex items-center px-4">
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
