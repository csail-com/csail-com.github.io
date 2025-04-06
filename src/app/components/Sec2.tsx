/** @jsxImportSource @emotion/react */
"use client";

import { Layer, MotionLayer, Spacing, Text } from "@/@dble_layout";
import Image from "@/@widgets/image";
import DecryptedText from "@/@widgets/motion/DecryptedText";
import useLanguage from "@/libs/provider/LanguageProvider";
import { mySite } from "@/libs/site/mySite";
import { useRef } from "react";

export default function Sec2() {
  const { translations } = useLanguage();
  const layerRef = useRef<HTMLDivElement>(null);

  return (
    <Layer align="center" padding={{ vertical: 180, horizontal: 25 }}>
      <Image
        source={`/images/sec2-banner.png`}
        alt={mySite.name}
        css={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <Layer maxW={1080} ref={layerRef} align="center" gap={160}>
        {translations.itmes.map((item, i) => (
          <MotionLayer
            key={item.label}
            maxW={500}
            align="center"
            padding={{ all: 25 }}
            initialY={0}
            delay={i * 0.2}
            initialOpacity={0}
            transitionType="tween"
            transition={{ duration: 0.5, type: "easeOut" }}
          >
            <Text
              as="strong"
              size={36}
              align="center"
              css={{
                background: "linear-gradient(5deg, #a587d9, #48b7c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
              _mq={{
                w1080: { size: 34 },
                w600: { size: 30 },
              }}
            >
              {item.label}
            </Text>

            <Spacing size={20} />

            <DecryptedText
              text={item.txt}
              animateOn="view"
              revealDirection="center"
            />
          </MotionLayer>
        ))}
      </Layer>
    </Layer>
  );
}
