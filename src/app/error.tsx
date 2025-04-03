"use client";
import ErrorView from "@/components/_layout/ErrorView";

//
export default function Error({
  reset,
}: {
  _error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <ErrorView
        type="error"
        title="서버 오류가 발생했습니다"
        description="일시적인 서버 오류입니다. 잠시 후 다시 시도해주세요🙏🏻"
        tabs={[{ name: "새로고침", onClick: () => reset() }]}
      />
    </>
  );
}
