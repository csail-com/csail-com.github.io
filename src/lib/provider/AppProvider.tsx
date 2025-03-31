/** @jsxImportSource @emotion/react */

"use client";

import ScrollPositionProvider from "@/providers/ScrollPositionProvider";
import { type ReactNode } from "react";
import EmotionProvider from "./EmotionProvider";
import QueryProvider from "./QueryProvider";
import RecoilProvider from "./RecoilProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <EmotionProvider>
      <QueryProvider>
        <RecoilProvider>
          <ScrollPositionProvider>
            <main
              css={{
                width: "100%",
                height: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {children}
            </main>
          </ScrollPositionProvider>
        </RecoilProvider>
      </QueryProvider>
    </EmotionProvider>
  );
}
