/** @jsxImportSource @emotion/react */
"use client";
import ErrorView from "@/components/_layout/ErrorView";

export default function GlobalError({
  reset,
}: {
  _error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorView
          type="error"
          title=" 심각한 서버 오류가 발생했습니다"
          description="서버에 문제가 발생했습니다. 나중에 다시 시도해주세요🙏🏻"
          tabs={[{ name: "새로고침", onClick: () => reset() }]}
        />
      </body>
    </html>
  );
}
