import { Layer, Spacing, Text } from "@/@dble_layout";
import LinkHref from "@/@dble_layout/widgets/LinkHref";

export default function Footer() {
  return (
    <Layer
      as="footer"
      padding={{ vertical: 40, horizontal: 30 }}
      align="center"
      fill="#484849"
    >
      <LinkHref
        href="https://drancom.com"
        target="_blank"
        txtWeight="medium"
        border={{ position: "bottom", stroke: 1, color: "#727272" }}
        padding={{ vertical: 4 }}
        txtColor="#c2c3cd"
        txtSize={13}
      >
        {"CSAIL Byoungkwon An >"}
      </LinkHref>

      <Spacing size={15} />

      <Text size={11} color="#9fa1a3">
        © 2025 CSAIL Inc. All rights reserved
      </Text>
    </Layer>
  );
}
