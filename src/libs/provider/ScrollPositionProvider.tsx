"use client";

import { useRouter } from "@/libs/hooks";
import { useScrollPositionStore } from "@/libs/store/scrollPositionStore";
import { ReactNode, useEffect } from "react";

// 실제 스크롤 위치 관리를 담당하는 내부 컴포넌트
function ScrollManager() {
  const router = useRouter();
  const { saveScrollPosition, getScrollPosition, forceScrollTop } =
    useScrollPositionStore();

  // 페이지 변경 시 스크롤 위치 저장
  useEffect(() => {
    const handleRouteChange = () => {
      saveScrollPosition(router.asPath, window.scrollY);
    };

    // Next.js 13에서는 router.events가 없으므로 beforeunload 이벤트를 사용
    window.addEventListener("beforeunload", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
    };
  }, [router.asPath, saveScrollPosition]);

  // 페이지 로드 시 스크롤 위치 복원
  useEffect(() => {
    // DOM이 완전히 렌더링될 때까지 약간의 지연
    const restoreScroll = setTimeout(() => {
      const savedPosition = getScrollPosition(router.asPath);
      window.scrollTo({
        top: savedPosition,
        behavior: "auto",
      });
    }, 100);

    return () => clearTimeout(restoreScroll);
  }, [router.asPath, getScrollPosition, forceScrollTop]);

  return null;
}

// Provider 컴포넌트
export function ScrollPositionProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollManager />
      {children}
    </>
  );
}

export default ScrollPositionProvider;
