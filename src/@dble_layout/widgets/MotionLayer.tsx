/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import { motion, useInView } from "framer-motion";
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { flexStylesProps } from "../styles/flexStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  MotionLayerLayoutElement,
  MotionLayerType,
} from "../types/props/MotionLayerPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const MotionLayer = memo(
  forwardRef<HTMLDivElement, MotionLayerLayoutElement & LayoutPropsRef>(
    (props, ref) => {
      const {
        as,
        children,
        className,

        // layout
        w,
        maxW,
        minW,
        h,
        maxH,
        minH,

        // flex
        flex,
        direc,
        isReverse,
        align,
        justify,
        gap,
        order,

        // position
        position,

        // padding
        padding,

        // margin
        margin,

        // background
        fill,
        border,
        shadow,
        blur,
        scale,
        rotate,

        //
        zIndex,
        transition,
        cursor,
        userSelect,

        //active
        _hover,
        _focus,
        _active,
        _mq = {},
        css: cssProp,

        // Motion-specific props
        initialY = 20, // 초기 Y축 위치
        initialX = 0, // 초기 X축 위치
        initialOpacity = 0, // 초기 투명도
        delay = 0, // 애니메이션 지연 시간
        duration = 0.5, // 애니메이션 지속 시간
        activeAnimation = false, // 애니메이션 활성화 여부
        transitionType, // 전환 유형 (tween, spring 등)
        stiffness, // 강성도 (스프링 애니메이션)
        damping, // 감쇠 계수 (스프링 애니메이션)
        mass = 1, // 질량 (스프링 애니메이션) (1이 기본값으로 자연스러운 움직임 제공, 최댓값은 없지만 일반적으로 1-10 사이 값 사용)
        bounce, // 탄성 (스프링 애니메이션)
        restSpeed, // 정지 속도 (애니메이션 종료 조건)
        restDelta, // 정지 거리 (애니메이션 종료 조건)

        ...rest
      } = props;

      // Internal reference handling
      const innerRef = useRef<HTMLDivElement>(null);
      const motionRef = useRef<HTMLDivElement>(null);
      const currentRef = ref || motionRef;

      // useInView with internal reference
      const isInView = useInView(innerRef, { once: false });

      // Set up reference forwarding
      useImperativeHandle(
        ref,
        () => innerRef.current || document.createElement("div")
      );

      // Animation state
      const [animate, setAnimate] = useState(false);
      // Add a new state to track when the element entered the viewport
      const [viewEntryTime, setViewEntryTime] = useState<number | null>(null);

      // Update animation state based on activeAnimation and isInView
      useEffect(() => {
        if (currentRef) {
          if (activeAnimation && isInView) {
            // Record the timestamp when the element enters the viewport
            if (viewEntryTime === null) {
              setViewEntryTime(Date.now());
            }
            setAnimate(true);
          } else {
            setAnimate(false);
            // Reset the entry time when element leaves viewport
            if (!isInView) {
              setViewEntryTime(null);
            }
          }
        } else {
          setAnimate(true);
          if (viewEntryTime === null) {
            setViewEntryTime(Date.now());
          }
        }
      }, [activeAnimation, isInView, currentRef, viewEntryTime]);

      // Calculate effective delay based on when the element entered the viewport
      const effectiveDelay = viewEntryTime === null ? delay : 0; // Use 0 if element isn't in view yet

      // Extended props styles function
      const ExtendedStyles = (props: MotionLayerType): SerializedStyles => {
        return css({
          width: props?.w,
          maxWidth: props?.maxW,
          minWidth: props?.minW,
          height: props?.h,
          maxHeight: props?.maxH,
          minHeight: props?.minH,

          // flex
          ...flexStylesProps({
            flex: props.flex,
            direc: props.direc,
            isReverse: props.isReverse,
            align: props.align,
            justify: props.justify,
            gap: props.gap,
            wrap: props.wrap,
            order: props.order,
          }),

          // position
          position: props?.position?.type,
          top: props?.position?.top,
          bottom: props?.position?.bottom,
          left: props?.position?.left,
          right: props?.position?.right,
          transform: props?.axis
            ? `translate(${
                typeof props?.axis?.x === "number"
                  ? `${props?.axis?.x}px`
                  : props?.axis?.x ?? "0"
              }, ${
                typeof props?.axis?.y === "number"
                  ? `${props?.axis?.y}px`
                  : props?.axis?.y ?? "0"
              })`
            : undefined,

          // padding
          ...spaceStylesProps({
            padding: {
              all: props.padding?.all,
              horizontal: props.padding?.horizontal,
              vertical: props.padding?.vertical,
              top: props.padding?.top,
              bottom: props.padding?.bottom,
              left: props.padding?.left,
              right: props.padding?.right,
            },
            margin: {
              all: props.margin?.all,
              horizontal: props.margin?.horizontal,
              vertical: props.margin?.vertical,
              top: props.margin?.top,
              bottom: props.margin?.bottom,
              left: props.margin?.left,
              right: props.margin?.right,
            },
          }),

          // background
          backgroundColor: props.fill,
          ...(props.border && borderStylesProps(props.border)),
          ...(props.shadow && shadowStylesProps(props.shadow)),
          ...transformStylesProps({
            scale: props.scale,
            rotate: props.rotate,
          }),
        });
      };

      // Base style
      const baseStyle = React.useMemo(
        () =>
          css({
            position: "relative",
            display: "flex",
            flexDirection: "column",
            ...baseStylesProps({
              transition,
              zIndex,
              cursor,
              userSelect,
              onClick: rest.onClick,
              onMouseEnter: rest.onMouseEnter,
            }),
          }),
        [
          cursor,
          rest.onClick,
          rest.onMouseEnter,
          transition,
          zIndex,
          userSelect,
        ]
      );

      // Move pPs initialization inside useMemo
      const pPs = React.useMemo(
        () => ({
          // layout
          w,
          maxW,
          minW,
          h,
          maxH,
          minH,

          // flex
          flex,
          direc,
          isReverse,
          align,
          justify,
          gap,
          order,

          // position
          position,

          // padding
          padding,

          // margin
          margin,

          // background
          fill,
          border,
          shadow,
          blur,
          scale,
          rotate,
        }),
        [
          w,
          maxW,
          minW,
          h,
          maxH,
          minH,
          flex,
          direc,
          isReverse,
          align,
          justify,
          gap,
          order,
          position,
          padding,
          margin,
          fill,
          border,
          shadow,
          blur,
          scale,
          rotate,
        ]
      );

      // Media-query styles
      const mediaStyles = React.useMemo(
        () => createMediaStyles(_mq, ExtendedStyles),
        [_mq]
      );

      // Pseudo styles
      const pseudoStyles = React.useMemo(
        () =>
          css({
            "&:hover": ExtendedStyles({ ..._hover }),
            "&:focus": ExtendedStyles({ ..._focus }),
            "&:active": ExtendedStyles({ ..._active }),
          }),
        [_hover, _focus, _active]
      );

      // Combined styles
      const combinedStyles = React.useMemo(
        () => css`
          ${baseStyle}
          ${ExtendedStyles({
            ...pPs,
            w: pPs.w ?? "100%",
            h: pPs.h ?? (pPs.flex === 1 ? "100%" : undefined),
            direc: pPs.direc ?? "column",
          })}
        ${mediaStyles}
        ${pseudoStyles}
        `,
        [baseStyle, pPs, mediaStyles, pseudoStyles]
      );

      const combinedClassName = cx(
        `dble-motion-layer${as ? `-${as}` : ""}`,
        className
      );

      // Use explicit type casting to fix complex generic type error
      const MotionComponent = (motion[as as keyof typeof motion] ||
        motion.div) as React.ElementType;

      return (
        <MotionComponent
          ref={innerRef}
          key={activeAnimation ? "active" : "inactive"}
          className={combinedClassName}
          css={css([combinedStyles, cssProp])}
          initial={{
            opacity: initialOpacity,
            y: initialY,
            x: initialX,
          }}
          animate={{
            opacity: animate || isInView ? 1 : initialOpacity,
            y: animate || isInView ? 0 : initialY,
            x: animate || isInView ? 0 : initialX,
          }}
          transition={{
            duration,
            delay: effectiveDelay, // Use the effective delay
            ...(transitionType && { type: transitionType }),
            ...(stiffness && { stiffness }),
            ...(damping && { damping }),
            ...(mass && { mass }),
            ...(bounce && { bounce }),
            ...(restSpeed && { restSpeed }),
            ...(restDelta && { restDelta }),
          }}
          {...(rest as React.HTMLProps<HTMLDivElement>)}
        >
          {children}
        </MotionComponent>
      );
    }
  )
);

MotionLayer.displayName = "MotionLayer";

export default MotionLayer;
