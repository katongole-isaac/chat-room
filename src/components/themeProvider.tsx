"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export default function ThemeAppProvider({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
}
