"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <Toaster />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextThemesProvider>
  );
};
