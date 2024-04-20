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
        <ThemeAppProvider>{children}</ThemeAppProvider>
      </body>
    </html>
  );
}
