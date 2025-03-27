/** @jsxImportSource @emotion/react */

"use client";

import { type ReactNode } from "react";
import EmotionProvider from "./EmotionProvider";
import QueryProvider from "./QueryProvider";
import RecoilProvider from "./RecoilProvider";

interface ProvidersProps {
  children: ReactNode;
}

export default function AppProvider({ children }: ProvidersProps) {
  return (
    <EmotionProvider>
      <QueryProvider>
        <RecoilProvider>
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
        </RecoilProvider>
      </QueryProvider>
    </EmotionProvider>
  );
}
