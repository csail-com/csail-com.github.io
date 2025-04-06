"use client";

import { forwardRef } from "react";
import ImageClient from "./ImageClient";
import { ImageProps } from "./types";

/**
 * 이미지 컴포넌트
 *
 * 서버 액션을 통해 이미지 메타데이터를 가져오고,
 * 클라이언트 컴포넌트에서 이미지를 렌더링합니다.
 *
 * 주요 기능:
 * - WebP 형식으로 자동 변환 (브라우저 지원 시)
 * - 이미지 크기 최적화 (디바이스 픽셀 비율 고려)
 * - 로딩 속도 개선 및 진행률 표시
 * - 블러 플레이스홀더 최적화
 * - 확대/축소 기능
 * - 호버 효과
 *
 * 사용 예시:
 * ```tsx
 * <Image
 *   source="https://example.com/image.jpg"
 *   alt="이미지 설명"
 *   optimizeOptions={{
 *     quality: 85,
 *     width: 800
 *   }}
 *   zoomUp
 * />
 * ```
 */
const Image = forwardRef<HTMLImageElement, Omit<ImageProps, "imageDimensions">>(
  (props, ref) => {
    // 클라이언트 컴포넌트에서 서버 액션을 호출하여 메타데이터 가져오기
    return <ImageClient {...props} ref={ref} />;
  }
);

Image.displayName = "Image";

export default Image;
