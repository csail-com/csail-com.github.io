"use client";

import { Flex, TouchableOpacity } from "@/@dble_layout";
import useLanguage from "@/libs/provider/LanguageProvider";
import { useEffect, useState } from "react";

export default function LanguageSwitcher({
  scrollActive,
}: {
  scrollActive: boolean;
}) {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Flex w="auto" direc="row" gap={12}>
      <TouchableOpacity
        txtSize={14}
        txtColor={
          scrollActive
            ? language === "ko"
              ? "#555"
              : "#aaa"
            : language === "ko"
            ? "#eee"
            : "#aaa"
        }
        txtWeight={language === "ko" ? "bold" : "normal"}
        padding={{ all: 5 }}
        onClick={() => setLanguage("ko")}
      >
        KO
      </TouchableOpacity>
      <TouchableOpacity
        txtSize={14}
        txtColor={
          scrollActive
            ? language === "en"
              ? "#555"
              : "#aaa"
            : language === "en"
            ? "#eee"
            : "#aaa"
        }
        txtWeight={language === "en" ? "bold" : "normal"}
        padding={{ all: 5 }}
        onClick={() => setLanguage("en")}
      >
        EN
      </TouchableOpacity>
    </Flex>
  );
}
