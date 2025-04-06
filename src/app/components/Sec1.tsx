/** @jsxImportSource @emotion/react */
"use client";

import { Layer, Spacing, Text } from "@/@dble_layout";
import Image from "@/@widgets/image";

import useLanguage from "@/libs/provider/LanguageProvider";
import { mySite } from "@/libs/site/mySite";

export default function Sec1() {
  const { translations } = useLanguage();

  return (
    <>
      <Layer
        minH="100vh"
        fill="#010101"
        align="center"
        justify="center"
        padding={{ top: 30, bottom: 70 }}
      >
        <Layer maxW={960} align="center">
          <Image
            source="/gif/section-banner.gif"
            alt={mySite.name}
            size={{ width: "100%", height: "100%", minWidth: 60 }}
            ratio={{ x: 16, y: 9 }}
          />
        </Layer>

        <Spacing size={20} />

        <Layer align="center" justify="center" padding={{ horizontal: 30 }}>
          <Text
            as="h1"
            color="#ccc"
            size={56}
            _mq={{
              w1440: { size: 52 },
              w1080: { size: 48 },
              w768: { size: 42 },
              w600: { size: 36 },
              w438: { size: 32 },
            }}
          >
            {translations.sec1.title}
          </Text>

          <Spacing size={24} />

          <Text
            as="p"
            align="center"
            size={24}
            color="#999"
            lineHeight={1.7}
            _mq={{
              w1080: { size: 20 },
              w768: { size: 18 },
              w600: { size: 16 },
            }}
          >
            {translations.sec1.description}
          </Text>
        </Layer>
      </Layer>
    </>
  );
}
