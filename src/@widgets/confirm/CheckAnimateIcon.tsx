/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import React from "react";

interface CheckIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  backgroundColor?: string;
  duration?: number;
  type?: "success" | "failed";
}

const drawCircle = keyframes`
  0% {
    stroke-dashoffset: 283;
    transform: rotate(-90deg);
  }
  100% {
    stroke-dashoffset: 0;
    transform: rotate(0deg);
  }
`;

const drawCheck = keyframes`
  0% {
    stroke-dashoffset: 50;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const drawX = keyframes`
  0% {
    stroke-dashoffset: 60;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.1;
  }
`;

const CheckAnimateIcon: React.FC<CheckIconProps> = ({
  size = 48,
  color,
  strokeWidth = 3,
  className,
  backgroundColor,
  duration = 0.7,
  type = "success",
}) => {
  // 타입에 따른 색상 및 배경색 설정
  const iconColor = color || (type === "success" ? "#4CAF50" : "#FF5252");
  const bgColor =
    backgroundColor || (type === "success" ? "#7fd5a1" : "#ffcdd2");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      css={css`
        .background {
          opacity: 0;
          animation: ${fadeIn} ${duration * 0.5}s ease forwards;
          animation-delay: ${duration * 0.7}s;
        }
        .circle {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          transform-origin: center;
          animation: ${drawCircle} ${duration}s cubic-bezier(0.65, 0, 0.35, 1)
            forwards;
        }
        .check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: ${drawCheck} ${duration * 0.4}s ease forwards;
          animation-delay: ${duration * 0.9}s;
        }
        .x-line1,
        .x-line2 {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: ${drawX} ${duration * 0.3}s ease forwards;
        }
        .x-line1 {
          animation-delay: ${duration * 0.9}s;
        }
        .x-line2 {
          animation-delay: ${duration * 1.1}s;
        }
        .icon-container {
          animation: ${pulse} ${duration * 0.5}s cubic-bezier(0.65, 0, 0.35, 1)
            forwards;
          animation-delay: ${duration * 1.3}s;
          transform-origin: center;
        }
      `}
    >
      <g className="icon-container">
        <circle className="background" cx="24" cy="24" r="22" fill={bgColor} />
        <circle
          className="circle"
          cx="24"
          cy="24"
          r="20"
          stroke={iconColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {type === "success" ? (
          <path
            className="check"
            d="M16 24L22 30L34 18"
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ) : (
          <>
            <path
              className="x-line1"
              d="M16 16L32 32"
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              className="x-line2"
              d="M32 16L16 32"
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        )}
      </g>
    </svg>
  );
};

export default CheckAnimateIcon;
