"use client";

import { useRouter } from "@/libs/hooks";
import { useScrollPositionStore } from "@/libs/store/scrollPositionStore";
import { ReactNode, useEffect, useRef, useState } from "react";

// Add type declaration for the window object
declare global {
  interface Window {
    _markNavigatingBack?: () => void;
    _lastScrollRestoration?: number;
  }
}

// 실제 스크롤 위치 관리를 담당하는 내부 컴포넌트
function ScrollManager() {
  const router = useRouter();
  const {
    saveScrollPosition,
    getScrollPosition,
    forceScrollTop,
    trackPath,
    lastPath,
  } = useScrollPositionStore();
  const isNavigatingBack = useRef(false);
  const restorationAttempts = useRef(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const targetScrollPosition = useRef(0);

  // Track current path
  useEffect(() => {
    trackPath(router.asPath);
  }, [router.asPath, trackPath]);

  // 페이지 변경 시 스크롤 위치 저장
  useEffect(() => {
    const handleRouteChange = () => {
      if (!isNavigatingBack.current) {
        saveScrollPosition(router.asPath, window.scrollY);
      }
    };

    // Next.js 13에서는 router.events가 없으므로 beforeunload 이벤트를 사용
    window.addEventListener("beforeunload", handleRouteChange);

    // Save position when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleRouteChange);
      handleRouteChange();
    };
  }, [router.asPath, saveScrollPosition]);

  // Handle scroll events during restoration to prevent unwanted resets
  useEffect(() => {
    if (!isRestoring) return;

    const handleScroll = () => {
      if (
        isRestoring &&
        Math.abs(window.scrollY - targetScrollPosition.current) > 5
      ) {
        window.scrollTo(0, targetScrollPosition.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRestoring]);

  // 페이지 로드 시 스크롤 위치 복원 - 개선된 버전
  useEffect(() => {
    const savedPosition = getScrollPosition(router.asPath);
    const now = Date.now();
    const isRecentNavigation =
      window._lastScrollRestoration &&
      now - window._lastScrollRestoration < 1000;

    // If we have a position to restore and either:
    // 1. We're explicitly navigating back, or
    // 2. We recently restored scroll and need to maintain it
    const shouldRestore =
      savedPosition > 0 &&
      !forceScrollTop &&
      (isNavigatingBack.current || isRecentNavigation);

    if (shouldRestore) {
      targetScrollPosition.current = savedPosition;
      setIsRestoring(true);

      // Multiple restoration at different intervals to handle various load times
      const restorePosition = () => {
        window.scrollTo({ top: savedPosition, behavior: "auto" });
        window._lastScrollRestoration = Date.now();
      };

      // Immediate attempt
      restorePosition();

      // Multiple delayed attempts to catch post-hydration resets
      const timers = [
        setTimeout(restorePosition, 100),
        setTimeout(restorePosition, 250),
        setTimeout(restorePosition, 500),
        setTimeout(restorePosition, 1000),
      ];

      // After all attempts, we can stop actively restoring
      const finalTimer = setTimeout(() => {
        setIsRestoring(false);
        isNavigatingBack.current = false;
      }, 1500);

      return () => {
        timers.forEach(clearTimeout);
        clearTimeout(finalTimer);
      };
    } else if (forceScrollTop) {
      // If we need to force scroll to top
      window.scrollTo({ top: 0, behavior: "auto" });
      isNavigatingBack.current = false;
    }

    // Reset state after some time
    const resetTimer = setTimeout(() => {
      setIsRestoring(false);
      isNavigatingBack.current = false;
    }, 1000);

    return () => clearTimeout(resetTimer);
  }, [router.asPath, getScrollPosition, forceScrollTop]);

  // Expose a function to mark when we're navigating back
  useEffect(() => {
    // Add to window for access from router.back
    window._markNavigatingBack = () => {
      isNavigatingBack.current = true;
      // Store in sessionStorage too for persistence between component mounts
      try {
        sessionStorage.setItem("isNavigatingBack", "true");
      } catch (e) {
        console.warn("Failed to set sessionStorage", e);
      }
    };

    // Check if we have a pending back navigation from session storage
    try {
      if (sessionStorage.getItem("isNavigatingBack") === "true") {
        isNavigatingBack.current = true;
        sessionStorage.removeItem("isNavigatingBack");
      }
    } catch (e) {
      console.warn("Failed to get from sessionStorage", e);
    }

    return () => {
      delete window._markNavigatingBack;
    };
  }, []);

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
