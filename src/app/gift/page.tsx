import { Layer, Spacing, Text } from "@/@dble_layout";

export default function Gift() {
  return (
    <Layer flex={1} align="center" justify="center" padding={{ all: 50 }}>
      <Text as="h1" size={18}>
        From . CSAIL
      </Text>

      <Spacing size={16} />

      <Text color="#aaa" align="center" lineHeight={1.8}>
        CSAIL 의 웹사이트 오픈을 진심으로 축하합니다 🎉
      </Text>

      <Spacing size={10} />

      <Text color="#aaa" size={14}>
        to. Jeong Jae Hwan
      </Text>
    </Layer>
  );
}
