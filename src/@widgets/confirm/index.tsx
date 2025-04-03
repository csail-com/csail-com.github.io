/** @jsxImportSource @emotion/react */
"use client";

import { Interpolation, Theme, keyframes } from "@emotion/react";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

//

import CheckAnimateIcon from "./CheckAnimateIcon";
import { ConfirmTitle } from "./ConfirmTitle";

// 실패 시 모달 흔들림 애니메이션 정의
const shakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-6px, -4px) rotate(-1deg); }
  20% { transform: translate(5px, 3px) rotate(1deg); }
  30% { transform: translate(-5px, -3px) rotate(-0.5deg); }
  40% { transform: translate(4px, 4px) rotate(0.5deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  60% { transform: translate(-4px, -3px) rotate(-0.5deg); }
  70% { transform: translate(5px, 2px) rotate(0.5deg); }
  80% { transform: translate(-3px, -2px) rotate(-0.5deg); }
  90% { transform: translate(3px, 2px) rotate(0.5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

/**
 * BottomConfirmBox 컴포넌트 Props
 */
interface Props {
  type?: "primary" | "success" | "failed"; // 확인창 타입
  open: boolean; // 열림 상태
  title: string; // 제목
  message?: string; // 메시지
  onConfirm: () => void; // 확인 콜백
  onClose: () => void; // 닫기 콜백
}

/**
 * 하단 확인 대화상자 컴포넌트
 * 타입에 따라 다른 UI와 동작을 제공
 */
const BottomConfirmBox: React.FC<Props> = ({
  type = "primary",
  open,
  title,
  message = "취소 및 닫기는 외부를 클릭하면 모달이 사라져요",
  onConfirm,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // 상태 관리
  const [delayedOpen, setDelayedOpen] = useState(false); // 지연된 열림 상태
  const [isAutoClosing, setIsAutoClosing] = useState(false); // 자동 닫힘 상태
  const [showShake, setShowShake] = useState(false); // 흔들림 애니메이션 상태

  // 모달 열림/닫힘 효과
  useEffect(() => {
    if (open) {
      // 약간의 지연 후 모달 표시 (진입 애니메이션 효과용)
      const timeout = setTimeout(() => setDelayedOpen(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setDelayedOpen(false);
    }
  }, [open]);

  // Failed 타입일 때 흔들림 애니메이션 처리
  useEffect(() => {
    if (delayedOpen && type === "failed") {
      // 약간의 딜레이 후 애니메이션 시작
      const animationTimeout = setTimeout(() => {
        setShowShake(true);

        // 애니메이션 완료 후 상태 초기화
        const resetTimeout = setTimeout(() => {
          setShowShake(false);
        }, 1000); // 애니메이션 길이에 맞게 조정

        return () => clearTimeout(resetTimeout);
      }, 100);

      return () => clearTimeout(animationTimeout);
    }
  }, [delayedOpen, type]);

  // 모달 닫기 핸들러
  const handleCancel = () => {
    setDelayedOpen(false);
    const timeout = setTimeout(() => onClose(), 100);
    return () => clearTimeout(timeout);
  };

  // Success 타입일 때 자동 닫힘 처리
  useEffect(() => {
    if (delayedOpen && type === "success") {
      // 자동 닫힘 상태 설정 (외부 클릭 비활성화 위함)
      setIsAutoClosing(true);

      // 1.2초 후 자동 닫힘
      const autoCloseTimeout = setTimeout(() => {
        handleCancel();
        setIsAutoClosing(false);
      }, 1200);

      return () => {
        clearTimeout(autoCloseTimeout);
        setIsAutoClosing(false);
      };
    }
  }, [delayedOpen, type]);

  // 모달 외부 클릭 핸들러
  const clickOutSideClose = !isAutoClosing && type !== "failed";
  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (
        clickOutSideClose &&
        open &&
        ref &&
        "current" in ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    },
    [open, handleCancel, clickOutSideClose, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);
    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  }, [clickModalOutside]);

  return (
    <>
      {open && (
        <>
          <Fixed open={delayedOpen}>
            <div
              ref={ref}
              css={{
                ...(flexT as []),
                height: "auto",
                maxWidth: type === "success" ? 86 : 340,
                minWidth: type === "success" ? 86 : 320,
                padding: 18,
                borderRadius: 24,
                overscrollBehavior: "contain",
                backgroundColor: "#fafafa",
                border: "1px solid #e2e2e2",
                boxShadow: `0 0 16px 0 ${
                  type === "failed"
                    ? "rgba(255, 0, 0, 0.12)" // 실패 시 빨간 그림자
                    : "rgba(66, 102, 193, 0.16)" // 기본 그림자
                }`,
                transition: "0.2s ease-in-out",
                animation: showShake
                  ? `${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both`
                  : "none",
                animationIterationCount: "1",
              }}
            >
              <div css={flexT}>
                {/* 성공 타입 UI */}
                {type === "success" && <CheckAnimateIcon />}

                {/* 기본 타입 UI */}
                {type === "primary" && (
                  <>
                    <ConfirmTitle title={title} message={message} />
                    <div css={{ minHeight: 10 }} />
                    <button
                      type="button"
                      onClick={onConfirm}
                      css={{ padding: 5, cursor: "pointer", outline: "none" }}
                    >
                      <CheckAnimateIcon duration={0} size={28} />
                    </button>
                  </>
                )}

                {/* 실패 타입 UI */}
                {type === "failed" && (
                  <>
                    <CheckAnimateIcon size={32} type="failed" />
                    <div css={{ minHeight: 15 }} />
                    <ConfirmTitle title={title} message={message} />
                    <div css={{ minHeight: 20 }} />
                    <button
                      type="button"
                      onClick={onClose}
                      css={{
                        userSelect: "none",
                        padding: "5px 14px",
                        cursor: "pointer",
                        outline: "none",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #e2e2e2",
                        fontSize: "0.875rem",
                        color: "#89888a",
                        borderRadius: 100,
                      }}
                    >
                      확인
                    </button>
                  </>
                )}
              </div>
            </div>
          </Fixed>
        </>
      )}
    </>
  );
};

export default BottomConfirmBox;

//
//
const flexT: Interpolation<Theme> = {
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "0.2s ease-in-out",
};

//
const Fixed = ({ children, open }: { children: ReactNode; open: boolean }) => {
  const bottom = `max(${20}px, env(safe-area-inset-bottom))`;
  const left = `max(${5}px, env(safe-area-inset-left))`;
  const right = `max(${5}px, env(safe-area-inset-right))`;

  return (
    <div
      css={{
        ...flexT,
        overscrollBehavior: "contain",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        opacity: open ? 1 : 0,
        zIndex: 10000000,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      {children}
    </div>
  );
};
