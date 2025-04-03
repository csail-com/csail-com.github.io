/** @jsxImportSource @emotion/react */
"use client";

import ErrorView from "@/components/_layout/ErrorView";

//
export default async function Error() {
  return (
    <ErrorView
      title="인터넷 연결이 끊어졌습니다"
      description="인터넷 연결 상태를 확인하고 다시 시도해주세요"
      type="offline"
      tabs={[
        {
          name: "새로고침",
          onClick: () => window.location.reload(),
        },
      ]}
    />
  );
}
