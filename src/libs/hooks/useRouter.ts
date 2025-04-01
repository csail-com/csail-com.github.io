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

/**
 * useSearchParams()를 사용하지 않는 간단한 라우터 훅
 * App Router 구조에서 문제없이 사용 가능하며, useRouter.ts의 주요 기능들을 포함합니다.
 * 스크롤 위치를 기억하는 기능도 포함되어 있습니다.
 */
export function useRouter() {
  const pathname = usePathname();
  const router = useNextRouter();
  const params = useParams();
  const { saveScrollPosition, setForceScrollTop } = useScrollPositionStore();

  // 라우트 패턴 가져오기
  const route = useMemo(() => pathname || "", [pathname]);

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
    asPath: pathname, // 쿼리 파라미터 없는 단순 버전
    route,
    params: params || {},
    isReady: true,
    query: {}, // 쿼리 파라미터 없는 빈 객체
    // 라우터 메서드
    push: router.push,
    replace: router.replace,
    back: handleBack, // 스크롤 위치 복원 기능이 포함된 뒤로가기
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}

export default useRouter;
