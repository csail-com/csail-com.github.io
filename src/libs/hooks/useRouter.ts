"use client";

import {
  useRouter as useNextRouter,
  useParams,
  usePathname,
} from "next/navigation";
import { useEffect, useMemo } from "react";
import { useScrollPositionStore } from "../store/scrollPositionStore";

// 뒤로가기 옵션 타입 정의
type BackOptions = {
  scroll?: "top" | "restore";
};

// 라우터 네비게이션 옵션 타입 정의
type RouterOptions = {
  pathname?: string;
  query?: Record<string, any>;
  hash?: string;
};

// Page Router 호환 라우터 옵션
type PageRouterOptions = {
  scroll?: boolean;
  shallow?: boolean;
};

/**
 * App Router 구조에서 Pages Router와 유사한 API를 제공하는 라우터 훅
 * 스크롤 위치를 기억하는 기능도 포함되어 있습니다.
 */
export function useRouter() {
  const pathname = usePathname();
  const router = useNextRouter();
  const params = useParams();
  const { saveScrollPosition, setForceScrollTop } = useScrollPositionStore();

  // 라우트 패턴 가져오기
  const route = useMemo(() => pathname || "", [pathname]);

  // params 객체만 활용하여 query 객체 생성 (useSearchParams 사용 안함)
  const query = useMemo(() => {
    const queryObj: Record<string, any> = {};

    // params 객체의 값들을 query에 추가
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        queryObj[key] = value;
      });
    }

    return queryObj;
  }, [params]);

  // 페이지 이동 시 스크롤 위치 저장
  useEffect(() => {
    if (!pathname) return;

    const handleBeforeUnload = () => {
      saveScrollPosition(pathname, window.scrollY);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveScrollPosition(pathname, window.scrollY);
    };
  }, [pathname, saveScrollPosition]);

  // URL 생성 헬퍼 함수
  const createUrl = (options: RouterOptions | string) => {
    if (typeof options === "string") return options;

    const {
      pathname: targetPath = "/",
      query: targetQuery = {},
      hash = "",
    } = options;

    // 쿼리 파라미터 문자열 생성
    const searchParams = new URLSearchParams();
    Object.entries(targetQuery).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    const hashString = hash ? `#${hash}` : "";

    return `${targetPath}${queryString ? `?${queryString}` : ""}${hashString}`;
  };

  // push 메서드 래핑 (Pages Router 방식 지원)
  const customPush = (
    url: RouterOptions | string,
    as?: string,
    options?: PageRouterOptions
  ) => {
    // 현재 pathname 저장
    if (pathname) {
      saveScrollPosition(pathname, window.scrollY);
    }

    // 스크롤 옵션 처리
    if (options?.scroll === false) {
      // 스크롤 방지 처리
      const targetPath = typeof url === "string" ? url : createUrl(url);
      router.push(targetPath, { scroll: false });
    } else {
      // 기본 동작
      const targetPath = typeof url === "string" ? url : createUrl(url);
      router.push(targetPath);
    }
  };

  // replace 메서드 래핑 (Pages Router 방식 지원)
  const customReplace = (
    url: RouterOptions | string,
    as?: string,
    options?: PageRouterOptions
  ) => {
    // 현재 pathname 저장
    if (pathname) {
      saveScrollPosition(pathname, window.scrollY);
    }

    // 스크롤 옵션 처리
    if (options?.scroll === false) {
      // 스크롤 방지 처리
      const targetPath = typeof url === "string" ? url : createUrl(url);
      router.replace(targetPath, { scroll: false });
    } else {
      // 기본 동작
      const targetPath = typeof url === "string" ? url : createUrl(url);
      router.replace(targetPath);
    }
  };

  // 스크롤 위치 복원 기능이 포함된 뒤로가기 함수
  const handleBack = (options?: BackOptions) => {
    if (!pathname) return;

    // 현재 스크롤 위치 저장
    saveScrollPosition(pathname, window.scrollY);

    // 옵션에 따라 스크롤 처리 방식 설정
    if (options?.scroll === "top") {
      // 맨 위로 스크롤하도록 설정
      setForceScrollTop(true);
    } else {
      // 저장된 스크롤 위치로 복원하도록 설정 (default)
      setForceScrollTop(false);
    }

    // Trigger this after the scroll position is saved to avoid timing issues
    if (window._markNavigatingBack) {
      window._markNavigatingBack();
    }

    // Small delay to ensure scroll positions are saved before navigation
    setTimeout(() => {
      // Navigate back
      router.back();
    }, 10);
  };

  return {
    pathname,
    asPath: pathname,
    route,
    params: params || {},
    isReady: true,
    query, // 이제 params 값을 포함
    // 라우터 메서드
    push: customPush, // Pages Router 방식 지원
    replace: customReplace, // Pages Router 방식 지원
    back: handleBack,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}

export default useRouter;
