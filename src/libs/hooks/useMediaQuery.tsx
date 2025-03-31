"use client";

import { useEffect, useState } from "react";

// 단일 미디어 쿼리를 처리하는 커스텀 훅
function useMediaQueryValue(query: string): boolean {
  // 서버사이드에서는 false로 초기화 (모바일 우선 접근법)
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // 서버사이드 렌더링에서는 window가 없으므로 체크
    if (typeof window === "undefined") return;

    // 초기 상태 설정을 위한 미디어 쿼리 평가
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // 미디어 쿼리 리스너 함수
    const updateMatches = () => setMatches(media.matches);

    // 이벤트 리스너 추가 (최신 API 사용)
    try {
      // 최신 API
      media.addEventListener("change", updateMatches);
    } catch {
      // 구형 브라우저 대응
      media.addListener(updateMatches);
    }

    // 클린업 함수
    return () => {
      try {
        media.removeEventListener("change", updateMatches);
      } catch {
        media.removeListener(updateMatches);
      }
    };
  }, [query]); // query가 변경될 때마다 훅을 다시 실행

  return matches;
}

// 여러 미디어 쿼리를 한번에 처리하는 메인 훅
export function useMediaQuery() {
  return {
    w1440: useMediaQueryValue("(max-width: 1440px)"),
    w1080: useMediaQueryValue("(max-width: 1080px)"),
    w780: useMediaQueryValue("(max-width: 700px)"),
    w600: useMediaQueryValue("(max-width: 600px)"),
    w438: useMediaQueryValue("(max-width: 438px)"),
  };
}
