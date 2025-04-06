/** @jsxImportSource @emotion/react */
import { Layer } from "@/@dble_layout";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useEffect, useState } from "react";

export default function Appbar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // 초기 체크
    handleScroll();

    // 정리(cleanup)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const iconFill = scrollY >= 70 ? "#333" : "#f2f2f2";
  const scrollActive = scrollY >= 70;

  return (
    <Layer
      as="header"
      minH={70}
      position={{ type: "fixed", top: 0, left: 0, right: 0 }}
      zIndex={1000}
      align="center"
      justify="center"
      fill={scrollActive ? "rgba(255,255,255,0.85)" : "transparent"}
      border={{
        position: "bottom",
        stroke: 1,
        color: scrollActive ? "#eee" : "transparent",
      }}
      transition={{ duration: 0.3, type: "easeOut" }}
    >
      <Layer
        h="100%"
        direc="row"
        align="center"
        justify="space-between"
        padding={{ left: 25, right: 20 }}
      >
        <svg
          viewBox="0 0 151 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          css={{ minWidth: 70, maxWidth: 80 }}
        >
          <path
            d="M20.23 8.04004C23.31 7.69004 25.84 8.13004 27.69 8.70004L28.66 1.33005C27.03 0.670049 23.5 0.110048 18.99 0.610048C7.35999 1.91005 -1.14001 10.54 0.389993 24.18C1.65999 35.55 9.45999 43.38 22.74 41.9C27.42 41.37 30.91 40.09 32.41 39.08L30.31 32.17C28.67 33.07 25.83 33.99 23.22 34.28C15.47 35.15 10.34 30.62 9.44999 22.62C8.44999 13.73 13.33 8.81004 20.23 8.04004Z"
            fill={iconFill}
          />
          <path
            d="M63.93 35.5901C64.99 33.8201 65.59 31.8401 65.59 29.7301C65.59 23.9901 62.06 20.2501 54.57 17.5901C49.1 15.6001 46.7 14.4501 46.7 11.8501C46.7 9.73013 48.71 7.92012 52.87 7.92012C57.03 7.92012 60.04 9.07013 61.74 9.85013L63.88 2.42012C61.37 1.33012 57.84 0.370117 53.05 0.370117C43.05 0.370117 37.01 5.68013 37.01 12.6301C37.01 18.5501 41.6 22.2901 48.65 24.6501C53.75 26.4001 55.76 27.8501 55.76 30.3901C55.76 32.9301 53.43 34.8001 49.03 34.8001C44.94 34.8001 40.98 33.5301 38.39 32.2601L37.48 35.8201C49.26 37.6601 51.72 36.9801 63.92 35.5801L63.93 35.5901Z"
            fill={iconFill}
          />
          <path
            d="M37.02 37.6602L36.46 39.8701C38.84 41.1401 43.63 42.3502 48.47 42.3502C54.28 42.3502 58.55 40.9002 61.38 38.6102C61.04 38.6102 60.71 38.6502 60.37 38.6602C53.77 38.8702 47.83 40.0102 37.01 37.6702L37.02 37.6602Z"
            fill={iconFill}
          />
          <path
            d="M66.27 41.7502H76.21L77.58 36.9802C74.31 37.4302 70.93 37.7902 67.43 38.0802L66.27 41.7502Z"
            fill={iconFill}
          />
          <path
            d="M79.23 31.2402H86.42C91 30.0402 95.62 28.6202 100.24 26.9902L91.81 0.430176H79.23L68.49 34.7702C71.82 34.3402 75.23 33.7702 78.72 33.0502L79.23 31.2502V31.2402ZM83.13 15.4302C83.82 13.0302 84.45 9.89018 85.08 7.43018H85.2C85.83 9.89018 86.59 12.9702 87.34 15.4302L89.98 24.2202H80.61L83.13 15.4302Z"
            fill={iconFill}
          />
          <path
            d="M94.65 41.7502H104.97L101.76 31.6501C98.74 32.5001 95.64 33.6401 92.34 34.3701L94.65 41.7502Z"
            fill={iconFill}
          />
          <path
            d="M118.9 0.380127H109.28V23.3801C112.53 21.9601 115.76 20.4601 118.9 18.8301V0.370117V0.380127Z"
            fill={iconFill}
          />
          <path
            d="M109.28 41.9801H118.9V24.8901C115.91 26.1601 112.71 27.7601 109.28 28.9601V41.9801Z"
            fill={iconFill}
          />
          <path
            d="M150.53 34.2502H133.66V16.4702C130.91 18.1802 127.71 20.0102 124.04 21.8702V41.9902H150.53"
            fill={iconFill}
          />
          <path
            d="M133.67 0.380127H124.05V15.6201C127.41 13.5601 131.19 11.2901 133.67 8.15012V0.380127Z"
            fill={iconFill}
          />
        </svg>

        <LanguageSwitcher scrollActive={scrollActive} />
      </Layer>
    </Layer>
  );
}
