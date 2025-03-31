import { Metadata } from "next";
import ContactUsPage from "./client";

// 문의하기 페이지 메타데이터 정의
export const metadata: Metadata = {
  title: "문의하기", // template에 따라 "문의하기 | 디블에이전시" 형태로 표시됨
  description:
    "디블에이전시에 웹사이트 제작 및 디자인 문의를 하실 수 있습니다.",
  openGraph: {
    title: "디블에이전시 문의하기",
    description:
      "디블에이전시에 웹사이트 제작 및 디자인 문의를 하실 수 있습니다.",
    images: ["/images/contactus-og.png"], // 문의 페이지 전용 이미지 (예시)
  },
};

export default function Page() {
  return <ContactUsPage />;
}
