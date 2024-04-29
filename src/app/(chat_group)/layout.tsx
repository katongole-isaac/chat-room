import React from "react";

export default function ChatLayout({ children }) {
  return (
    <div className="min-h-full w-full bg-light-100 dark:bg-dark text-dark-200 dark:text-light-300 ">
      {children}
    </div>
  );
}
