/** @jsxImportSource @emotion/react */
"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import BottomConfirmBox from ".";

/**
 * 확인창 설정을 위한 인터페이스
 * @property {string} type - 확인창 타입 ("primary", "success", "failed")
 * @property {string} title - 제목
 * @property {string} message - 본문 메시지
 * @property {Function} onConfirm - 확인 버튼 클릭 시 실행할 콜백 함수
 */
interface ConfirmOptions {
  type?: "primary" | "success" | "failed";
  title?: string;
  message?: string;
  onConfirm?: () => void;
}

/**
 * Confirm 컨텍스트 인터페이스
 */
interface ConfirmContextType {
  onConfirm: (options: ConfirmOptions) => void;
}

// 컨텍스트 생성
const ConfirmContext = createContext<ConfirmContextType | null>(null);

/**
 * 확인창 Provider 컴포넌트
 * 애플리케이션 전체에서 확인창을 쉽게 호출할 수 있게 해주는 컨텍스트 프로바이더
 */
export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 모달 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"primary" | "success" | "failed">("primary");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [callback, setCallback] = useState<(() => void) | undefined>(undefined);

  // 애니메이션 전환 상태 관리
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * 모달 열기 함수
   * 필요한 속성이 없을 경우 타입별 기본값 적용
   */
  const onConfirm = ({
    type = "primary",
    title,
    message,
    onConfirm,
  }: ConfirmOptions) => {
    // 타입별 기본값 설정
    let modalTitle = "";
    let modalMessage = "";

    if (type === "primary") {
      modalTitle = title || "아래 버튼을 클릭하세요";
      modalMessage =
        message || "취소 및 닫기는 외부를 클릭하면 모달이 사라져요";
    } else if (type === "failed") {
      modalTitle = title || "요청에 실패했어요";
      modalMessage = message || "확인 후 다시 한번 시도해주세요";
    } else if (type === "success") {
      modalTitle = title || "성공했습니다!";
      modalMessage = message || "";
    }

    // 애니메이션 처리 로직
    if (isOpen && !isTransitioning) {
      // 이미 모달이 열려있는 경우, 애니메이션 효과를 위해 잠시 닫았다가 다시 열기
      setIsTransitioning(true);
      setIsOpen(false);

      // 모달이 닫힌 후 새 내용으로 다시 열기
      setTimeout(() => {
        setType(type);
        setTitle(modalTitle);
        setMessage(modalMessage);
        setCallback(() => onConfirm);
        setIsOpen(true);

        // 전환 상태 해제 (빠른 연속 호출 방지)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 300);
    } else if (!isTransitioning) {
      // 모달이 닫혀있거나 전환 중이 아닌 경우 바로 열기
      setType(type);
      setTitle(modalTitle);
      setMessage(modalMessage);
      setCallback(() => onConfirm);
      setIsOpen(true);
    }
  };

  /**
   * 모달 닫기 함수
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  /**
   * 확인 버튼 핸들러
   * 타입에 따라 다르게 동작: primary는 자동 닫힘, success/failed는 수동 닫힘
   */
  const handleConfirm = () => {
    if (type === "primary") {
      // Primary 타입일 때는 확인 후 모달 닫기
      setIsOpen(false);
    }
    // 콜백 함수 실행 (모든 타입에서 실행)
    if (callback) callback();
  };

  return (
    <ConfirmContext.Provider value={{ onConfirm }}>
      {children}
      <BottomConfirmBox
        type={type}
        open={isOpen}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  );
};

/**
 * useConfirm 훅
 * 컴포넌트에서 확인창을 쉽게 사용할 수 있게 해주는 커스텀 훅
 */
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};
