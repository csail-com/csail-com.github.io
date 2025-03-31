"use client";

import {
  CookieValueTypes,
  deleteCookie,
  getCookie,
  setCookie,
} from "cookies-next";

// OptionsType 직접 정의
interface OptionsType {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  [key: string]: string | number | boolean | Date | undefined;
}

interface UseCookie {
  set: (name: string, value: string, options?: OptionsType) => void;
  get: (name: string) => CookieValueTypes | Promise<CookieValueTypes>;
  remove: (name: string, options?: OptionsType) => void;
}

export const useCookie: UseCookie = {
  set: (name, value, options = {}) => {
    setCookie(name, value, {
      path: "/",
      ...options,
      // 예제
      // maxAge: 60 * 60 * 24 * 7, // 7일간 유효
      // secure: process.env.NODE_ENV === "production",
    });
  },
  get: (name) => {
    return getCookie(name);
  },
  remove: (name, options = {}) => {
    deleteCookie(name, {
      path: "/",
      ...options,
    });
  },
};
