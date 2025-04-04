/** @jsxImportSource @emotion/react */
"use client";

import {
  Background,
  Button,
  Flex,
  MotionLayer,
  Padding,
  Text,
} from "@/@dble_layout";

import CheckIcon from "@/@widgets/confirm/CheckAnimateIcon";
import { useRouter } from "@/libs/hooks";
import { useConfirm } from "@/libs/provider/ConfirmProvider";
import { useDialog } from "@/libs/provider/DialogProvider";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { onConfirm } = useConfirm();
  const { openDialog } = useDialog();
  const [inputValue, setInputValue] = useState("");

  // 승인 처리 함수
  const handleApprove = () => {
    if (!inputValue) {
      onConfirm({
        type: "failed",
        message: "인증 코드를 입력해주세요",
        onConfirm: () => console.log("인증 코드 미입력"),
      });
      return;
    }

    // 입력 값이 "1234"인지 확인
    if (inputValue === "1234") {
      onConfirm({
        type: "success",
        title: "승인 완료",
        message: "정상적으로 승인되었습니다.",
        onConfirm: () => {
          console.log("승인 성공");
          setInputValue(""); // 입력값 초기화
        },
      });
    } else {
      onConfirm({
        type: "failed",
        message: "잘못된 인증 코드입니다. 다시 확인해주세요.",
        onConfirm: () => console.log("잘못된 인증 코드"),
      });
    }
  };

  const handlePrimaryConfirm = () => {
    onConfirm({
      onConfirm: () => console.log("기본 확인 버튼 클릭됨"),
    });
  };

  // 기본값 테스트용 함수들
  const testDefaultSuccess = () => {
    onConfirm({
      type: "success",
      onConfirm: () => console.log("기본 성공 메시지"),
    });
  };

  const testDefaultFailed = () => {
    onConfirm({
      type: "failed",
      onConfirm: () => console.log("기본 실패 메시지"),
    });
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <Background fill="#f0f0f0">
        <Padding all={50} _mq={{ w1080: { all: 20 } }}>
          <Flex gap={30} direc="column" align="start">
            <MotionLayer>
              <Text size={50} as="h1">
                확인창 테스트
              </Text>
            </MotionLayer>

            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                marginTop: 20,
                padding: 20,
                backgroundColor: "white",
                borderRadius: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Text size={24} as="h2" css={{ marginBottom: 15 }}>
                승인 시스템
              </Text>

              <Text size={14} css={{ color: "#666", marginBottom: 15 }}>
                인증 코드 "1234"를 입력하면 승인됩니다.
              </Text>

              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="인증 코드를 입력하세요"
                  style={{
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    flexGrow: 1,
                    fontSize: "16px",
                  }}
                />
                <Button
                  onClick={handleApprove}
                  css={{
                    backgroundColor: "#FF5722",
                    fontSize: "16px",
                    padding: "0 20px",
                  }}
                >
                  승인하기
                </Button>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <Text size={20} as="h2" css={{ marginBottom: 15 }}>
                기본값 테스트
              </Text>
              <Flex gap={10}>
                <Button onClick={handlePrimaryConfirm}>기본 확인창</Button>
                <Button onClick={testDefaultSuccess}>기본 성공창</Button>
                <Button onClick={testDefaultFailed}>기본 실패창</Button>
              </Flex>
            </div>

            <Button
              onClick={() =>
                openDialog({
                  title: "이전으로 이동하시겠어요?",
                  message:
                    "이전 페이지로 이동하면\n입력 또는 저장된 정보는 초기화돼요",
                  tabName: "뒤로가기",
                  onResult: handleGoToLogin,
                })
              }
            >
              로그인 페이지로 이동
            </Button>

            <CheckIcon size={64} color="#4CAF50" />
          </Flex>
        </Padding>
      </Background>
    </>
  );
}
