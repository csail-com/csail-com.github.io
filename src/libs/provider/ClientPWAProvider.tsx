"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const PWARegister = dynamic(() => import("@/libs/store/PWARegister"), {
  ssr: false,
});

export default function ClientPWAProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PWARegister />
      {children}
    </>
  );
}
