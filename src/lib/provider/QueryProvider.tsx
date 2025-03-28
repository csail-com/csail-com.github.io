"use client";

import { getQueryClient } from "@/lib/tanstackQuery/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
