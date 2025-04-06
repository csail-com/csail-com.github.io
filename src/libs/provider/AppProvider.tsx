/** @jsxImportSource @emotion/react */

"use client";

// import { Appbar } from "@/@widgets/navigator/Appbar";
// import Footer from "@/components/_layer/Footer";
import Appbar from "@/components/_layout/Appbar";
import Footer from "@/components/_layout/Footer";
import { LanguageProvider } from "@/libs/provider/LanguageProvider";
import { menus } from "@/libs/site/menus";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { useOpenWebBrowser } from "../hooks";
import EmotionProvider from "./EmotionProvider";
import ScrollPositionProvider from "./ScrollPositionProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldShowLayout = menus.some((menu) => pathname.includes(menu.url));
  useOpenWebBrowser();

  return (
    <EmotionProvider>
      <ScrollPositionProvider>
        <LanguageProvider>
          <div
            css={{
              width: "100%",
              height: "100%",
              minHeight: "100vh",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {shouldShowLayout && <Appbar />}

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

            {shouldShowLayout && <Footer />}
          </div>
        </LanguageProvider>
      </ScrollPositionProvider>
    </EmotionProvider>
  );
}
