/** @jsxImportSource @emotion/react */

"use client";

// import { Appbar } from "@/@widgets/navigator/Appbar";
// import Footer from "@/components/_layer/Footer";
import { menus } from "@/libs/site/menus";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import ClientPWAProvider from "./ClientPWAProvider";
import ConfirmProvider from "./ConfirmProvider";
import EmotionProvider from "./EmotionProvider";
import { JengaProvider } from "./JengaProvider";
import QueryProvider from "./QueryProvider";
import RecoilProvider from "./RecoilProvider";
import ScrollPositionProvider from "./ScrollPositionProvider";
import { DialogProvider } from "./DialogProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldShowLayout = menus.some((menu) => pathname.includes(menu.url));

  return (
    <ClientPWAProvider>
      <EmotionProvider>
        <QueryProvider>
          <RecoilProvider>
            <ScrollPositionProvider>
              <ConfirmProvider>
                <DialogProvider>
                  <JengaProvider>
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
                      {/* {shouldShowLayout && <Appbar />} */}

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

                      {/* {shouldShowLayout && <Footer />} */}
                    </div>
                  </JengaProvider>
                </DialogProvider>
              </ConfirmProvider>
            </ScrollPositionProvider>
          </RecoilProvider>
        </QueryProvider>
      </EmotionProvider>
    </ClientPWAProvider>
  );
}
