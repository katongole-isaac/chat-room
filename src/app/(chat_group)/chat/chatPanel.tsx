"use client";

import React, {  useEffect, useRef, useState } from "react";
import MessageInput from "./messageInput";
import Message from "./message";
import dynamic from "next/dynamic";
import ChatListings from "./chatListings";
import MessageTopBar from "./messageTopbar";
import { FaAngleDown } from "react-icons/fa";


const Theme = dynamic(() => import("../../../components/themeSwticher"));

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const messageInputWrapperRef = useRef<HTMLDivElement>(null);
  const messageInputWrapperRefPlaceholder = useRef<HTMLDivElement>(null);
  
  const [ showScrollBottomButton, setShowScrollBottomButton ] = useState(false);

  const handleSendMessage = (msg: string) => {
    console.log("msg: ", msg);

    console.log(messageRef.current);

    setMessages((prev) => [msg, ...prev]);

    messageContainerRef.current.scrollTo({
      top: messageContainerRef.current.scrollHeight ,
      behavior: "auto",
    });
  };

  const handleSmoothScrollToBottom = () =>  {

    messageContainerRef.current.scrollTo({
      top: messageContainerRef.current.scrollHeight ,
      behavior: "smooth",
    });

  }

  const messageDivScrollHandler = (e : Event) => {
      
    const minimumScrollHeight = 130;
    const scrollTop = Math.abs(messageContainerRef.current.scrollTop);

    if(scrollTop >= minimumScrollHeight)
      return setShowScrollBottomButton(true);
      
      setShowScrollBottomButton(false);
  }

  useEffect(() => {

    messageContainerRef.current.addEventListener("scroll",messageDivScrollHandler);

    return () => {
      messageContainerRef.current.removeEventListener("scroll",messageDivScrollHandler);
    }

   },[]);

   useEffect(()=> {

   const _resizeObserver = new ResizeObserver( entries => {
      
      for(let entry of entries) {
       
        messageInputWrapperRefPlaceholder.current.style.height = entry.target.scrollHeight.toString() + "px"
      } 

    });

    _resizeObserver.observe(messageInputWrapperRef.current)

    return () => _resizeObserver.disconnect();

   },[])

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
          <div className="flex-1 relative overflow-y-auto hidden-scrollbar mb-2">
            
              <div
                ref={messageContainerRef}
                className="relative h-full border_ overflow-y-auto custom-scrollbar border-amber-500 flex flex-col-reverse gap-4  py-3"
              >
                {messages.map((msg, i) => (
                  <Message key={i} message={msg} ref={messageRef} />
                ))}
                
              </div>

               {
                  showScrollBottomButton && (
                    <div className="absolute bottom-3 right-3">
                        <OverflowButton onClick={handleSmoothScrollToBottom} />
                      </div>
                  ) 
                }

            </div>
             
          {/* placeholder for the absolutely position element */}
          <div className="h-20" ref={messageInputWrapperRefPlaceholder} ></div>
          
          <div ref={messageInputWrapperRef} className="absolute bottom-0 w-full dark:bg-dark  shadow-md min-h-20 border-t dark:border-t-gray-700 flex items-center py-2 px-4">
            
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}

const OverflowButton : React.FC< {onClick: () => void} > = ( { onClick }) => {
  return (
    <div onClick={onClick} role="button" aria-roledescription="button" className="w-8 h-8 rounded-full dark:bg-dark-50 bg-light-200 hover:bg-light-50 hover:dark:bg-dark-50/85 shadow-md z-30 flex justify-center items-center cursor-pointer transition-all ">
      <FaAngleDown />
    </div>
  )
}