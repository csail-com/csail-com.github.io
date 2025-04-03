import ErrorView from "@/components/_layout/ErrorView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "페이지를 찾을 수 없습니다",
};

//
export default async function NotFound() {
  return (
    <ErrorView
      type="404"
      title="페이지를 찾을 수 없습니다"
      description="아래 버튼을 통해 이전 페이지로 이동하세요"
    />
  );
}
