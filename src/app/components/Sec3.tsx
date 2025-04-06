"use client";

import ScrollVelocity from "@/@widgets/motion/ScrollVelocity";
import useLanguage from "@/libs/provider/LanguageProvider";
import lang from "../../../public/lang/en.json";
import { Padding } from "@/@dble_layout";

export default function Sec3() {
  const { translations } = useLanguage();

  return (
    <Padding vertical={100}>
      <ScrollVelocity
        texts={[
          lang.sec1.title + " / " + lang.sec2.title + " /",
          lang.sec3.title + " / " + lang.sec4.title + " /",
        ]}
        velocity={100}
        className="custom-scroll-text"
      />
    </Padding>
  );
}
