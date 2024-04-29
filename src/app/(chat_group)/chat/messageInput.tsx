"use client";
import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";

interface Props {
  onSend: (message: string) => void;
}
export default function MessageInput({ onSend }: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const onEnter = () => {
    const _message = inputRef.current.innerText;

    inputRef.current.innerText = ""; // reseting the input

    setShowPlaceholder(inputRef.current.innerHTML === "");

    if (_message.trim() === "") return;

    onSend(_message);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setShowPlaceholder(e.currentTarget.innerText === "");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    setShowPlaceholder(false);

    e.preventDefault();

    const pastedData = e.clipboardData.getData("text/plain");

    inputRef.current.innerHTML += pastedData;
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onEnter();
      return;
    }
  };

  const handleInputFocus = (e: KeyboardEvent) => {
    if ((e.ctrlKey, e.key.toLowerCase() === "k")) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleInputFocus);
    return () => {
      window.removeEventListener("keydown", handleInputFocus);
    };
  }, []);

  return (
    <>
      <div className="border border-gray-500 rounded-md w-full  py-1 relative ">
        <div
          ref={inputRef}
          contentEditable
          onKeyDown={onkeydown}
          onInput={handleInput}
          onPaste={handlePaste}
          suppressContentEditableWarning
          role="textbox"
          spellCheck="true"
          title="Write a message"
          className=" px-2 py-[0.2rem]   max-h-[150px] h-full select-text whitespace-pre-wrap  overflow-y-auto z-[2] rounded-md outline-none custom-scrollbar text-textLight dark:text-gray-300"
        ></div>
        {showPlaceholder && (
          <div className="absolute top-2 left-3 pointer-events-none text-gray-500 dark:text-gray-400">
            Write a message
          </div>
        )}
      </div>
    </>
  );
}

