import { CSSObject } from "@emotion/react";

export type SizeThemeType = {
  isLoading?: boolean;
  size?: {
    width?: "auto" | "100%" | string | number;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: "auto" | "100%" | string | number;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  ratio?: { x?: number; y?: number };
  shadow?: { x?: number; y?: number; blur?: number; color?: string };
  scale?: number;
  borderRadius?: string | number;
};

export type ImageOptimizeOptions = {
  // 이미지 너비 (픽셀 단위)
  width?: number;
  // 이미지 높이 (픽셀 단위, 비율 유지하면서 조정)
  height?: number;
  // 이미지 품질 (1-100)
  quality?: number;
  // 디바이스 픽셀 비율 (고해상도 디스플레이 대응)
  pixelRatio?: number;
};

export interface ImageProps {
  source: string;
  alt: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  zoomUp?: boolean;
  isLoading?: boolean;
  optimizeOptions?: {
    quality?: number;
    width?: number;
    height?: number;
  };
  imageDimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
  css?: CSSObject;
  size?: {
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  ratio?: {
    x: number;
    y: number;
  };
  borderRadius?: number | string;
  shadow?: {
    x: number;
    y: number;
    blur: number;
    color: string;
  };
  scale?: number;
  priority?: boolean;
  isHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLImageElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLImageElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLImageElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLImageElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLImageElement>) => void;
  tabIndex?: number;
  role?: string;
  "aria-label"?: string;
}
