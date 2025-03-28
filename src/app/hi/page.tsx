/** @jsxImportSource @emotion/react */
"use client";

import { Background, Button, Flex, MotionLayer, Text } from "@/@dble_layout";
import { useRouter } from "@/hooks/useRouter";
export default function Page() {
  const router = useRouter();

  return (
    <Background fill="#f0f0f0">
      <Flex gap={200}>
        <MotionLayer>
          <Text size={50} as="h1">
            하이페이지임
          </Text>
        </MotionLayer>

        <Button onClick={() => router.back()}>Go to hi</Button>
        {/* <Padding all={100} _mq={{ w1080: { all: 20 } }}>
          <CanvasDraw initialData={JSON.stringify(strokeData)} />
        </Padding> */}
      </Flex>
    </Background>
  );
}
