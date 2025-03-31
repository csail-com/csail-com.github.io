"use client";

import { useEffect, useState } from "react";

export const useTypingText = (text: string) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100; // 타이핑 속도 (밀리초)
  const deletingSpeed = 50; // 백스페이스 속도 (밀리초)
  const pauseTime = 1000; // 완성 후 대기 시간 (밀리초)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;

      if (!isDeleting) {
        // 타이핑 중
        setDisplayedText(fullText.substring(0, displayedText.length + 1));

        if (displayedText.length + 1 === fullText.length) {
          // 전체 텍스트가 완성되면 대기 후 삭제 시작
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // 삭제 중
        setDisplayedText(fullText.substring(0, displayedText.length - 1));

        if (displayedText.length - 1 === 0) {
          // 전체 텍스트가 삭제되면 다시 타이핑 시작
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    loopNum,
    text,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayedText;
};
