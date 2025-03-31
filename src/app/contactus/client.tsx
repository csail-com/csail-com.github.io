/** @jsxImportSource @emotion/react */
"use client";

import { Background, Flex, MotionLayer, Padding, Text } from "@/@dble_layout";

export default function ContactUsPage() {
  return (
    <Background fill="#f5f5f5">
      <Padding all={50} _mq={{ w1080: { all: 20 } }}>
        <Flex gap={30}>
          <MotionLayer>
            <Text size={40} as="h1">
              문의하기
            </Text>
          </MotionLayer>

          <Text size={18}>
            디블에이전시에 웹사이트 제작 및 디자인 관련 문의를 하실 수 있습니다.
          </Text>

          {/* 문의 양식 등 추가 가능 */}
        </Flex>
      </Padding>
    </Background>
  );
}
