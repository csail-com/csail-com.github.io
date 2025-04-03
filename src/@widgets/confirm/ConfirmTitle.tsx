/** @jsxImportSource @emotion/react */
import { CSSObject } from "@emotion/react";

export const ConfirmTitle = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  const initialStyle: CSSObject = {
    whiteSpace: "pre-line",
    userSelect: "none",
    wordBreak: "break-all",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  };

  return (
    <>
      <b
        css={{
          fontSize: "1rem",
          color: "#5e5f69",
          ...initialStyle,
        }}
      >
        {title}
      </b>

      <div css={{ minHeight: 6 }} />

      <p
        css={{
          fontSize: "0.875rem",
          color: "#87888a",
          ...initialStyle,
        }}
      >
        {message}
      </p>
    </>
  );
};
