"use client";

import { Layer, MotionLayer, Spacing, Text } from "@/@dble_layout";
import useLanguage from "@/libs/provider/LanguageProvider";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Sec4() {
  const { translations } = useLanguage();

  const sectionItems = [
    {
      bg: "/images/sec4-banner.png",
      title: translations.sec1.title,
      description: translations.sec1.description,
    },
    {
      bg: "/images/sec5-banner.png",
      title: translations.sec2.title,
      description: translations.sec2.description,
    },
    {
      bg: "/images/sec6-banner.png",
      title: translations.sec3.title,
      description: translations.sec3.description,
    },
  ];

  // 각 섹션에 대한 ref 개별 생성
  const ref0 = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  // ref 배열로 정리
  const sectionRefs = [ref0, ref1, ref2];

  // 각 섹션에 대한 스크롤 처리와 스케일 정보 생성
  const section0Animation = useScroll({
    target: ref0,
    offset: ["end end", "end start"],
  });
  const section1Animation = useScroll({
    target: ref1,
    offset: ["end end", "end start"],
  });
  const section2Animation = useScroll({
    target: ref2,
    offset: ["end end", "end start"],
  });

  const scale0 = useTransform(
    section0Animation.scrollYProgress,
    [0, 1],
    [1, 0.65]
  );
  const scale1 = useTransform(
    section1Animation.scrollYProgress,
    [0, 1],
    [1, 0.65]
  );
  const scale2 = useTransform(
    section2Animation.scrollYProgress,
    [0, 1],
    [1, 0.65]
  );

  const scales = [scale0, scale1, scale2];

  return (
    <Layer padding={{ top: 20 }} align="center">
      {sectionItems.map((item, index) => (
        <Layer
          key={index}
          maxW={1600}
          padding={{ horizontal: 20, bottom: 100 }}
        >
          <MotionLayer
            border={{ radius: 30 }}
            ref={sectionRefs[index]}
            minH={`calc(80vh - 20px)`}
            transition={{
              duration: 0.3,
              type: "ease",
            }}
            padding={{ horizontal: 25, vertical: 250 }}
            style={{
              scale: scales[index] as any,
              backgroundImage: `url(${item.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            _mq={{
              w600: {
                minH: `calc(70vh - 20px)`,
              },
            }}
          >
            <MotionLayer
              position={{
                type: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              align="center"
              justify="center"
              padding={{ all: 20 }}
            >
              <Text
                as="h2"
                size={40}
                align="center"
                color={index === 0 ? "#fff" : "#e2e2e2"}
                _mq={{
                  w1080: { size: 34 },
                  w600: { size: 30 },
                }}
              >
                {item.title}
              </Text>

              <Spacing size={20} />

              <Text
                color={index === 0 ? "#eee" : "#ccc"}
                align="center"
                size={16}
              >
                {item.description}
              </Text>
            </MotionLayer>
          </MotionLayer>
        </Layer>
      ))}
    </Layer>
  );
}
