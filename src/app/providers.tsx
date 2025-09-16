"use client";

import React, { FC, ReactNode } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export const Providers: FC<{
  className?: string;
  children: ReactNode;
  themeProps: ThemeProviderProps;
}> = ({ className, children, themeProps }) => (
  <HeroUIProvider className={className}>
    <ThemeProvider {...themeProps}>{children}</ThemeProvider>
    <ToastProvider />
  </HeroUIProvider>
);
