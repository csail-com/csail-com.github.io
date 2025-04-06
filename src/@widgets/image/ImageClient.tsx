/** @jsxImportSource @emotion/react */
"use client";

import { Skeleton } from "@/@dble_layout";
import { CSSObject } from "@emotion/react";
import Image from "next/image";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PopupImageWrapper } from "./instances/PopupImageWrapper";
import { ImageProps } from "./types";

const ImageClient = forwardRef(function ImageClient(
  props: ImageProps,
  ref?: ForwardedRef<HTMLImageElement>
) {
  const {
    source,
    alt,
    objectFit,
    zoomUp,
    isLoading,
    optimizeOptions,
    imageDimensions: initialDimensions,
    ...rest
  } = props;

  const imgRef = useRef<HTMLImageElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [zoomImg, setZoomImg] = useState(false);
  const [showZoomImage, setShowZoomImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 이미지 크기 정보
  const [imageDimensions, setImageDimensions] = useState(initialDimensions);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | undefined>(
    initialDimensions?.aspectRatio
  );

  // 이미지 로딩 진행률 시뮬레이션
  useEffect(() => {
    if (isLoading || isLoaded) return;

    const startTime = Date.now();
    let animationId: number;

    const simulateLoading = () => {
      const elapsed = Date.now() - startTime;
      if (isLoaded || loadingProgress >= 100) {
        setLoadingProgress(100);
        return;
      }

      const newProgress = Math.min(
        100,
        Math.floor(100 / (1 + Math.exp(-0.01 * (elapsed - 1000))))
      );
      setLoadingProgress(newProgress);

      animationId = requestAnimationFrame(simulateLoading);
    };

    animationId = requestAnimationFrame(simulateLoading);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isLoading, isLoaded, loadingProgress]);

  // 이미지 로드 핸들러
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const aspectRatio = naturalWidth / naturalHeight;
    setImageAspectRatio(aspectRatio);
    setIsLoaded(true);
    setLoadingProgress(100);
  };

  // 클릭 핸들러
  const handleOnClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (source && zoomUp) {
      setZoomImg(true);
      rest.onClick?.(event);
    } else {
      rest.onClick?.(event);
    }
  };

  const imageWrapperStyle = (styleProps: typeof props) => ({
    position: "relative" as const,
    width: styleProps.size?.width ?? "100%",
    minWidth: styleProps.size?.minWidth,
    maxWidth: styleProps.size?.maxWidth,
    minHeight: styleProps.size?.minHeight,
    maxHeight: styleProps.size?.maxHeight,
    height: styleProps.size?.height,
    borderRadius: styleProps.borderRadius,
    aspectRatio: styleProps.ratio
      ? `${styleProps.ratio.x}/${styleProps.ratio.y}`
      : imageAspectRatio
      ? `${imageAspectRatio}/1`
      : undefined,
    transition: "0.3s ease-in-out",
    boxShadow: styleProps.shadow
      ? `${styleProps.shadow.x}px ${styleProps.shadow.y}px ${styleProps.shadow.blur}px ${styleProps.shadow.color}`
      : undefined,
    userSelect: "none",
    overflow: "hidden",
    scale: styleProps.scale,
  });

  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (
        zoomImg &&
        imgRef.current &&
        !imgRef.current.contains(event.target as Node)
      )
        setZoomImg(false);
    },
    [zoomImg]
  );

  useEffect(() => {
    if (zoomImg) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = "hidden";

      const timer = setTimeout(() => {
        setShowZoomImage(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflowY = "auto";

      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      setShowZoomImage(false);
    }

    document.addEventListener("mousedown", clickModalOutside);
    return () => document.removeEventListener("mousedown", clickModalOutside);
  }, [zoomImg, clickModalOutside]);

  const onHover = () => {
    if (rest.isHover) setIsHover(!isHover);
  };

  // DOM에 전달할 수 있는 props만 선택
  const domProps = {
    className: rest.className,
    style: rest.style,
    onClick: rest.onClick,
    onKeyDown: rest.onKeyDown,
    onKeyUp: rest.onKeyUp,
    onKeyPress: rest.onKeyPress,
    onFocus: rest.onFocus,
    onBlur: rest.onBlur,
    tabIndex: rest.tabIndex,
    role: rest.role,
    "aria-label": rest["aria-label"],
  };

  return (
    <>
      <div
        onMouseEnter={onHover}
        onMouseLeave={onHover}
        css={{
          ...(imageWrapperStyle(props) as unknown as CSSObject),
          cursor: rest.onClick || zoomUp ? "pointer" : "default",
        }}
        {...domProps}
      >
        {isLoading ? (
          <Skeleton
            h={"100%" as unknown as number}
            w={"100%" as unknown as number}
          />
        ) : (
          <>
            {/* 로딩 프로그레스 표시 */}
            {!isLoaded && (
              <div
                css={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: `${loadingProgress}%`,
                  height: "2px",
                  backgroundColor: "#4a90e2",
                  transition: "width 0.2s ease-out",
                  zIndex: 5,
                }}
              />
            )}

            <Image
              itemProp="image"
              ref={ref}
              src={source}
              alt={alt}
              priority={rest.priority}
              fill
              quality={optimizeOptions?.quality ?? 75}
              loading={rest?.priority ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onClick={handleOnClick}
              onLoad={handleImageLoad}
              css={{
                overflow: "hidden",
                objectFit: objectFit ?? "cover",
                width: "100%",
                height: "100%",
                filter: isLoaded ? "none" : "blur(10px)",
                transition: "filter 0.3s ease-in-out",
                scale: isHover ? 1.05 : 1,
                boxShadow: rest.shadow
                  ? `${rest.shadow.x}px ${rest.shadow.y}px ${rest.shadow.blur}px ${rest.shadow.color}`
                  : undefined,
              }}
            />
          </>
        )}
      </div>

      {!isLoading && zoomImg && showZoomImage && (
        <PopupImageWrapper onCancel={() => setZoomImg(false)}>
          <div
            css={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            <Image
              src={source}
              alt={alt}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </PopupImageWrapper>
      )}
    </>
  );
});

ImageClient.displayName = "ImageClient";

export default ImageClient;
