"use client";

import { useCallback, useEffect, useState } from "react";

// 로컬 스토리지 키
const SCROLL_POSITIONS_KEY = "scrollPositions";
const FORCE_SCROLL_TOP_KEY = "forceScrollTop";

// 브라우저 환경인지 확인하는 함수
const isBrowser = typeof window !== "undefined";

// 로컬 스토리지에서 값 가져오기
const getItemFromStorage = <T>(key: string, defaultValue: T): T => {
  if (!isBrowser) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`로컬 스토리지에서 ${key} 값을 가져오는데 실패했습니다.`, e);
    return defaultValue;
  }
};

// 로컬 스토리지에 값 저장하기
const setItemToStorage = <T>(key: string, value: T): void => {
  if (!isBrowser) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`로컬 스토리지에 ${key} 값을 저장하는데 실패했습니다.`, e);
  }
};

// 스크롤 위치 관리를 위한 커스텀 훅
export function useScrollPositionStore() {
  // 로컬 상태
  const [positions, setPositions] = useState<Record<string, number>>({});
  const [forceScrollTop, setForceScrollTop] = useState(false);

  // 브라우저 환경에서만 로컬 스토리지에서 초기값 로드
  useEffect(() => {
    if (isBrowser) {
      const savedPositions = getItemFromStorage<Record<string, number>>(
        SCROLL_POSITIONS_KEY,
        {}
      );
      setPositions(savedPositions);

      const savedForceScrollTop = getItemFromStorage<boolean>(
        FORCE_SCROLL_TOP_KEY,
        false
      );
      setForceScrollTop(savedForceScrollTop);
    }
  }, []);

  // 특정 경로의 스크롤 위치 저장
  const saveScrollPosition = useCallback((path: string, position: number) => {
    setPositions((prev) => {
      const newPositions = { ...prev, [path]: position };
      setItemToStorage(SCROLL_POSITIONS_KEY, newPositions);
      return newPositions;
    });
  }, []);

  // 특정 경로의 스크롤 위치 가져오기
  const getScrollPosition = useCallback(
    (path: string) => {
      if (!isBrowser) return 0;

      // 강제로 맨 위로 스크롤해야 하는 경우
      if (forceScrollTop) {
        // 사용 후 상태 초기화 (일회성)
        setForceScrollTop(false);
        setItemToStorage(FORCE_SCROLL_TOP_KEY, false);
        return 0;
      }

      // 저장된 위치 반환 (없으면 0)
      return positions[path] || 0;
    },
    [positions, forceScrollTop]
  );

  // 강제 스크롤 상태 설정
  const setForceScrollTopValue = useCallback((value: boolean) => {
    setForceScrollTop(value);
    setItemToStorage(FORCE_SCROLL_TOP_KEY, value);
  }, []);

  // 모든 스크롤 위치 초기화
  const clearScrollPositions = useCallback(() => {
    setPositions({});
    setItemToStorage(SCROLL_POSITIONS_KEY, {});
  }, []);

  return {
    positions,
    forceScrollTop,
    saveScrollPosition,
    getScrollPosition,
    clearScrollPositions,
    setForceScrollTop: setForceScrollTopValue,
  };
}
