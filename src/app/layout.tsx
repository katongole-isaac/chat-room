import React from "react";

import type { Metadata } from "next";

import "./global.css";
import ThemeAppProvider from "../components/themeProvider";

export const metadata: Metadata = {
  title: "Chat Room",
  description: "New Chat Room",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>
        <ThemeAppProvider>
          <div className="dark:bg-dark  dark:text-light-300 bg-light text-dark-200  max-h-max">
            {children}
          </div>
        </ThemeAppProvider>
      </body>
    </html>
  );
}
