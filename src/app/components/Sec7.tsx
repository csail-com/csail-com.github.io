"use client";

import { Layer, MotionLayer, Spacing, Text } from "@/@dble_layout";
import Image from "@/@widgets/image";
import useLanguage from "@/libs/provider/LanguageProvider";
import { MQ } from "@/libs/themes";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Sec7() {
  const { translations } = useLanguage();

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale: any = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <Layer
      fill="#f0ebe2"
      align="center"
      padding={{ horizontal: 25, vertical: 250 }}
      _mq={{
        w1080: {
          padding: { vertical: 100, horizontal: 15 },
        },
      }}
    >
      <MotionLayer
        maxW={1080}
        direc="row"
        gap={50}
        border={{ radius: 30 }}
        padding={{ all: 30 }}
        ref={targetRef}
        transition={{ duration: 0.3, type: "ease" }}
        align="center"
        fill="rgba(255,255,255,0.8)"
        _mq={{
          w1080: {
            direc: "column",
            gap: 30,
          },
          w600: {
            padding: { all: 20 },
            border: { radius: 25 },
          },
        }}
      >
        <Image
          source="/gif/orb-animate.gif"
          alt="sec6-banner"
          size={{ maxWidth: 400 }}
          borderRadius={30}
          css={{
            [MQ[2]]: { maxWidth: "100%" },
            [MQ[3]]: { borderRadius: 20 },
          }}
        />

        <MotionLayer maxW={500} _mq={{ w1080: { maxW: "100%" } }}>
          <Text
            as="h2"
            size={40}
            color="#af9f91"
            _mq={{
              w1080: { size: 34 },
              w600: { size: 28 },
            }}
          >
            {translations.sec4.title}
          </Text>

          <Spacing size={25} />

          <Text
            color="#88898a"
            size={16}
            lineHeight={1.6}
            padding={{ bottom: 10 }}
            _mq={{
              w600: { size: 15 },
            }}
          >
            {translations.sec4.description}
          </Text>
        </MotionLayer>
      </MotionLayer>
    </Layer>
  );
}
