import React from "react";
import SearchInput from "../../../components/common/searchInput";
import ChatHeader from "./chatHeader";
import ChatList from "./chatList";

export default function ChatListings() {
  return (
    <div className="h-full border1 border-rose-700">
      <div className="gap-2 flex flex-col h-full  ">
        {/* title */}
        <div className="min-h-20 ">
          <ChatHeader />
        </div>

        {/* search inpt */}
        <div className="min-h-10 flex items-center px-2 ">
          <SearchInput />
        </div>

        {/* other controls */}
        <div className="min-h-8 px-3 flex items-center">
          <p className="font-medium text-lg dark:text-gray-200">Your conversations</p>
        </div>

        {/* chat lists */}
        <div className="py-2 flex-1 overflow-y-auto custom-scrollbar pb-10">
          <div className="space-y-4">
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
          </div>
        </div>
      </div>
    </div>
  );
}
