/** @jsxImportSource @emotion/react */
"use client";

import {
  Background,
  Button,
  Flex,
  MotionLayer,
  Padding,
  Text,
} from "@/@dble_layout";
import { useRouter } from "@/libs/hooks";

export default function Page() {
  const router = useRouter();

  return (
    <Background fill="#f0f0f0">
      <Padding all={50} _mq={{ w1080: { all: 20 } }}>
        <Flex gap={200}>
          <MotionLayer>
            <Text size={50} as="h1">
              하이욤 zzzzz
            </Text>
          </MotionLayer>

          <Button onClick={() => router.push("/hi")}>Go to hi</Button>
        </Flex>
      </Padding>
    </Background>
  );
}
