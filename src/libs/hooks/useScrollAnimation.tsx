"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

export function useScrollAnimation(options: ScrollObserverOptions = {}) {
  // 현재 활성화된 아이템의 ID를 추적
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const elementsMapRef = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 모든 등록된 요소 ID 목록
  const registeredElementsRef = useRef<string[]>([]);

  // Initialize the observer
  useEffect(() => {
    // 화면 중앙에 위치한 요소를 찾기 위해 rootMargin을 조정
    // 상단과 하단 영역을 줄여서 중앙에 가까운 요소만 감지하도록 함
    const { rootMargin = "-40% 0px -40% 0px" } = options;

    // Create intersection observer with high threshold to ensure elements are well in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 교차된 요소 찾기
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        // 교차된 요소가 있으면 그 중 첫 번째를 활성화
        if (intersectingEntries.length > 0) {
          const targetElement = intersectingEntries[0].target as HTMLElement;
          const id = targetElement.dataset.scrollId || "";
          setActiveElement(id);
        }
        // 교차된 요소가 없고 현재 활성화된 요소가 화면을 벗어난 경우
        else if (entries.length > 0 && activeElement) {
          const exitingElement = entries.find(
            (e) => (e.target as HTMLElement).dataset.scrollId === activeElement
          );

          if (exitingElement && !exitingElement.isIntersecting) {
            // 스크롤 방향 확인
            const scrollingDown =
              exitingElement.boundingClientRect.y <
              exitingElement.rootBounds?.y!;

            // 현재 활성화된 요소의 인덱스 찾기
            const currentIndex =
              registeredElementsRef.current.indexOf(activeElement);

            // 스크롤 방향에 따라 다음 또는 이전 요소 활성화
            if (
              scrollingDown &&
              currentIndex < registeredElementsRef.current.length - 1
            ) {
              // 다음 요소 활성화
              setActiveElement(registeredElementsRef.current[currentIndex + 1]);
            } else if (!scrollingDown && currentIndex > 0) {
              // 이전 요소 활성화
              setActiveElement(registeredElementsRef.current[currentIndex - 1]);
            }
          }
        }
      },
      { rootMargin, threshold: 0.5 }
    );

    // Observe all existing elements
    elementsMapRef.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options, activeElement]);

  // Handle element cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        elementsMapRef.current.forEach((element) => {
          observerRef.current?.unobserve(element);
        });
        elementsMapRef.current.clear();
        registeredElementsRef.current = [];
      }
    };
  }, []);

  // 요소가 추가될 때 순서대로 배열에 저장
  const registerElement = useCallback(
    (id: string, index: number) => {
      // 이미 등록된 경우 무시
      if (registeredElementsRef.current.includes(id)) return;

      // 인덱스에 맞는 위치에 삽입 (정렬 유지)
      registeredElementsRef.current[index] = id;

      // 첫 번째 요소가 등록될 때 활성화
      if (activeElement === null && registeredElementsRef.current.length > 0) {
        setActiveElement(registeredElementsRef.current[0]);
      }
    },
    [activeElement]
  );

  // Ref callback
  const setRef = useCallback(
    (element: HTMLElement | null, id: string, index: number): void => {
      // Skip if no ID
      if (!id) return;

      if (element) {
        // Register the element with its position index
        registerElement(id, index);

        // Clean up previous observation if element had changed
        const previousElement = elementsMapRef.current.get(id);
        if (
          previousElement &&
          previousElement !== element &&
          observerRef.current
        ) {
          observerRef.current.unobserve(previousElement);
        }

        // Set data attribute for identification
        element.dataset.scrollId = id;

        // Store element in our map
        elementsMapRef.current.set(id, element);

        // Start observing if observer exists
        if (observerRef.current) {
          observerRef.current.observe(element);
        }
      } else {
        // Element is null, which means it's being unmounted
        const previousElement = elementsMapRef.current.get(id);
        if (previousElement && observerRef.current) {
          observerRef.current.unobserve(previousElement);
        }
        elementsMapRef.current.delete(id);

        // Remove from registered elements
        registeredElementsRef.current = registeredElementsRef.current.filter(
          (regId) => regId !== id
        );
      }
    },
    [registerElement]
  );

  // Check if element is the active one
  const isActive = useCallback(
    (id: string) => {
      return id === activeElement;
    },
    [activeElement]
  );

  return { setRef, isActive };
}
