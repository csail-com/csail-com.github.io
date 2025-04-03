"use client";
import { useRouter } from "@/libs/hooks";
import { useSearchParams } from "next/navigation";

import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(router.query);
  console.log(router);
  console.log("ss", searchParams.getAll("id"));
  const params = new URLSearchParams(searchParams.toString());

  console.log("params", params.get("id"));

  return <>{children}</>;
}
