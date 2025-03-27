"use client";

import { Theme } from "@emotion/react";

export const emotionTheme: Theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#ff0000",
    background: "#ffffff",
    text: "#333333",
  },
  fonts: {
    body: "var(--font-noto-sans-kr)",
    heading: "var(--font-noto-sans-kr)",
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
};
