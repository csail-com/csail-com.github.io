import { CSSObject } from '@emotion/react';
import { HTMLMotionProps } from 'framer-motion';
import { ElementType, ReactNode } from 'react';
import { BorderType } from '../piece/BorderType';
import { CursorType } from '../piece/CursorType';
import { LayoutElementType } from '../piece/LayoutElementType';
import { MediaQueryType } from '../piece/MediaQueryType';
import { ExcludedProps } from '../piece/PipeLinePropsType';
import { PositionType } from '../piece/PositionType';
import { ShadowType } from '../piece/ShadowType';
import { TrafficType } from '../piece/TrafficType';
import { TransitionType } from '../piece/TransitionType';

/**
 * MotionLayerType - 기본 동작 레이어 타입
 *
 * 이 인터페이스는 HTMLMotionProps<'div'>를 확장합니다. framer-motion의 기본 속성들:
 * - animate: 요소가 애니메이션되어야 하는 최종 상태를 정의합니다 (예: { opacity: 1, x: 0 })
 * - initial: 요소의 초기 상태를 정의합니다 (예: { opacity: 0, x: -100 })
 * - exit: 요소가 제거될 때의 애니메이션 상태를 정의합니다
 * - transition: 애니메이션의 타이밍 및 물리적 속성을 제어합니다
 * - variants: 애니메이션의 사전 정의된 상태 집합을 정의합니다
 * - whileHover: 마우스 오버 시 적용할 애니메이션 상태를 정의합니다
 * - whileTap: 요소를 누르고 있을 때 적용할 애니메이션 상태를 정의합니다
 * - whileDrag: 드래그 중일 때 적용할 애니메이션 상태를 정의합니다
 * - whileFocus: 포커스 상태일 때 적용할 애니메이션 상태를 정의합니다
 * - whileInView: 요소가 뷰포트 내에 있을 때 적용할 애니메이션 상태를 정의합니다
 * - viewport: 뷰포트 관련 옵션을 정의합니다 (예: { once: true, margin: "100px" })
 */
export interface MotionLayerType extends Omit<HTMLMotionProps<'div'>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  //flex
  flex?: string | number;
  direc?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  isReverse?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; // align-items
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'; // justify-content
  gap?: string | number;
  order?: number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'; // flex-wrap

  // position
  position?: PositionType;
  axis?: { x?: string | number; y?: string | number };

  // padding
  padding?: TrafficType;

  // margin
  margin?: TrafficType;

  // background
  fill?: string;
  border?: BorderType;
  shadow?: ShadowType;
  blur?: number;
  opacity?: number;
  scale?: number;
  rotate?: string | number;
}

export interface MotionLayerPropsType<T extends ElementType = 'div'> extends Omit<MotionLayerType, ExcludedProps> {
  as?: T;
  children: ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all';
  _mq?: MediaQueryType<MotionLayerType>;
  _hover?: Partial<MotionLayerType>;
  _focus?: Partial<MotionLayerType>;
  _active?: Partial<MotionLayerType>;

  // Motion-specific props

  // 애니메이션 시작 시 Y축 초기 위치 (px 단위)
  // 양수값: 아래에서 위로 움직임, 음수값: 위에서 아래로 움직임
  initialY?: number;

  // 애니메이션 시작 시 X축 초기 위치 (px 단위)
  // 양수값: 오른쪽에서 왼쪽으로 움직임, 음수값: 왼쪽에서 오른쪽으로 움직임
  initialX?: number;

  // 애니메이션 시작 시 초기 투명도 (0~1 사이 값)
  // 0: 완전 투명, 1: 완전 불투명
  initialOpacity?: number;

  // 애니메이션 시작 전 지연 시간 (초 단위)
  // 요소가 화면에 나타난 후 애니메이션이 시작되기까지의 대기 시간
  delay?: number;

  // 애니메이션 지속 시간 (초 단위)
  // 애니메이션이 시작부터 끝까지 완료되는 데 걸리는 시간
  duration?: number;

  // 애니메이션 활성화 여부
  // true: 애니메이션 활성화, false: 애니메이션 비활성화
  // 요소가 뷰포트에 들어왔을 때 동작하는 애니메이션 트리거 설정
  activeAnimation?: boolean;

  // 애니메이션 전환 유형
  // 'tween': 일반적인 부드러운 애니메이션 (기본값)
  // 'spring': 물리적인 스프링 효과가 있는 애니메이션
  // 'inertia': 관성을 가진 감속 애니메이션
  // 'just': 즉시 값 변경
  transitionType?: 'tween' | 'spring' | 'inertia' | 'just';

  // 스프링 애니메이션의 강성도
  // 값이 클수록 더 빠르고 강한 스프링 효과 생성 (spring 타입에서만 사용)
  stiffness?: number;

  // 스프링 애니메이션의 감쇠 계수
  // 값이 클수록 진동이 빨리 안정화 (spring 타입에서만 사용)
  damping?: number;

  // 스프링 애니메이션의 질량
  // 값이 클수록 더 무겁고 느린 움직임 (spring 타입에서만 사용)
  mass?: number;

  // 스프링 애니메이션의 탄성
  // 값이 클수록 더 많이 튀는 효과 (spring 타입에서만 사용)
  bounce?: number;

  // 애니메이션이 멈추는 속도 임계값
  // 애니메이션 속도가 이 값보다 낮아지면 자동으로 종료 (spring 타입에서만 사용)
  restSpeed?: number;

  // 애니메이션이 멈추는 거리 임계값
  // 최종 위치와의 거리가 이 값보다 작아지면 자동으로 종료 (spring 타입에서만 사용)
  restDelta?: number;
}
export type MotionLayerLayoutElement = Omit<MotionLayerPropsType<LayoutElementType>, ExcludedProps>;
