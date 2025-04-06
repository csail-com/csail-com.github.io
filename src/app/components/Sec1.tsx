/** @jsxImportSource @emotion/react */
"use client";

import { Layer, Spacing, Text } from "@/@dble_layout";
// next-video 대신 React 표준 비디오 사용
// import Video from "next-video";

import useLanguage from "@/libs/provider/LanguageProvider";

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
          <div
            css={{
              width: "100%",
              position: "relative",
              aspectRatio: "16/9",
              minWidth: "60px",
              overflow: "hidden",
            }}
          >
            {/* next-video 컴포넌트 대신 일반 video 요소 사용 */}
            <video
              src="/videos/section-banner.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              css={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
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
