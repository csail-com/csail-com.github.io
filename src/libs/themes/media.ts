"use client";

// ----------------------------
// -------- MediaQuery --------
// ----------------------------
export const screenSize = [1440, 1080, 768, 600, 438, 375];
export const MQ = screenSize.map((bp) => `@media (max-width: ${bp}px)`);
