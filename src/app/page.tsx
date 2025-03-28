/** @jsxImportSource @emotion/react */
"use client";

import { Background, Button, Flex, MotionLayer, Text } from "@/@dble_layout";
import { useRouter } from "@/hooks/useRouter";

export default function Page() {
  const router = useRouter();

  const strokeData = [
    {
      resource:
        "/Users/jaehwan/Desktop/new-nextjs-appp/src/@dble_layout/widgets/Border.tsx",
      owner: "eslint",
      code: {
        value: "react/display-name",
        target: {
          $mid: 1,
          path: "/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/display-name.md",
          scheme: "https",
          authority: "github.com",
        },
      },
      severity: 8,
      message: "Component definition is missing display name",
      source: "eslint",
      startLineNumber: 15,
      startColumn: 16,
      endLineNumber: 139,
      endColumn: 3,
      modelVersionId: 1,
    },
    {
      resource:
        "/Users/jaehwan/Desktop/new-nextjs-appp/src/@dble_layout/widgets/Border.tsx",
      owner: "typescript",
      code: "2345",
      severity: 8,
      message:
        "'(props: BorderType) => { opacity: number | undefined; border: string | undefined; borderBottom: string | undefined; borderTop: string | undefined; borderRight: string | undefined; ... 8 more ...; backgroundColor: string | undefined; } | { ...; } | { ...; }' 형식의 인수는 '(styles: BorderType) => string | SerializedStyles' 형식의 매개 변수에 할당될 수 없습니다.\n  '{ opacity: number | undefined; border: string | undefined; borderBottom: string | undefined; borderTop: string | undefined; borderRight: string | undefined; borderLeft: string | undefined; ... 7 more ...; backgroundColor: string | undefined; } | { ...; } | { ...; }' 형식은 'string | SerializedStyles' 형식에 할당할 수 없습니다.\n    '{ opacity: number | undefined; border: string | undefined; borderBottom: string | undefined; borderTop: string | undefined; borderRight: string | undefined; borderLeft: string | undefined; ... 7 more ...; backgroundColor: string | undefined; }' 형식은 'string | SerializedStyles' 형식에 할당할 수 없습니다.",
      source: "ts",
      startLineNumber: 109,
      startColumn: 34,
      endLineNumber: 109,
      endColumn: 48,
      modelVersionId: 1,
    },
    {
      resource:
        "/Users/jaehwan/Desktop/new-nextjs-appp/src/@dble_layout/widgets/Border.tsx",
      owner: "eslint",
      code: {
        value: "@typescript-eslint/no-explicit-any",
        target: {
          $mid: 1,
          path: "/rules/no-explicit-any",
          scheme: "https",
          authority: "typescript-eslint.io",
        },
      },
      severity: 8,
      message: "Unexpected any. Specify a different type.",
      source: "eslint",
      startLineNumber: 134,
      startColumn: 20,
      endLineNumber: 134,
      endColumn: 23,
      modelVersionId: 1,
    },
    {
      resource:
        "/Users/jaehwan/Desktop/new-nextjs-appp/src/@dble_layout/widgets/Border.tsx",
      owner: "eslint",
      code: {
        value: "react-hooks/exhaustive-deps",
        target: {
          $mid: 1,
          path: "/facebook/react/issues/14920",
          scheme: "https",
          authority: "github.com",
        },
      },
      severity: 4,
      message:
        "The 'pPs' object makes the dependencies of useMemo Hook (at line 125) change on every render. Move it inside the useMemo callback. Alternatively, wrap the initialization of 'pPs' in its own useMemo() Hook.",
      source: "eslint",
      startLineNumber: 46,
      startColumn: 9,
      endLineNumber: 61,
      endColumn: 4,
      modelVersionId: 1,
    },
    {
      points: [
        { x: 511.70703125, y: 306.1484375 },
        { x: 511.44921875, y: 305.6484375 },
        { x: 511.703125, y: 304.890625 },
        { x: 512.2109375, y: 304.6328125 },
        { x: 517.0859375, y: 302.19140625 },
        { x: 517.59375, y: 301.6796875 },
        { x: 526.22265625, y: 297.84375 },
        { x: 529.84375, y: 295.66796875 },
        { x: 537.21875, y: 291.9765625 },
        { x: 548.5703125, y: 286.8125 },
        { x: 557.19921875, y: 282.9765625 },
        { x: 567.3203125, y: 277.9140625 },
        { x: 577.44140625, y: 272.8515625 },
        { x: 587.3203125, y: 268.8984375 },
        { x: 593.4453125, y: 266.26953125 },
        { x: 595.81640625, y: 265.67578125 },
        { x: 599.4375, y: 264.22265625 },
        { x: 608.06640625, y: 261.34375 },
        { x: 615.44140625, y: 258.57421875 },
        { x: 616.5625, y: 258.19921875 },
        { x: 617.68359375, y: 258.19921875 },
        { x: 617.9375, y: 257.94140625 },
        { x: 619.05859375, y: 257.94140625 },
        { x: 619.3125, y: 257.68359375 },
        { x: 619.56640625, y: 257.68359375 },
      ],
      color: "#000000",
      brushRadius: 4,
    },
  ];

  return (
    <Background fill="#f0f0f0">
      <Flex gap={200}>
        <MotionLayer>
          <Text size={50} as="h1">
            하이욤 zzzzz
          </Text>
        </MotionLayer>

        <Button onClick={() => router.push("/hi")}>Go to hi</Button>
        {/* <Padding all={100} _mq={{ w1080: { all: 20 } }}>
          <CanvasDraw initialData={JSON.stringify(strokeData)} />
        </Padding> */}
      </Flex>
    </Background>
  );
}
