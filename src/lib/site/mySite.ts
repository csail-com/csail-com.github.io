export const mySite = {
  name: "디블에이전시",
  title: "디블에이전시",
  description: "디블에이전시 웹사이트",
  category: "웹 디자인 & 개발",
  url: "https://dbleagency.com",
  ogImageUrl: "/images/og-banner.png",

  keywords: ["디블에이전시", "웹디자인", "웹개발", "모바일앱", "UI/UX"],
  sns: [
    "https://pinterest.com/dble_ui/_created",
    "https://www.behance.net/dble2",
    "https://dribbble.com/dbleui",
    "https://www.instagram.com/dble_ui",
    "https://github.com/deep-hwan",
  ],

  business: {
    name: "주식회사 디블에이전시",
    author: "정재환",
    tel: "+82-02-1234-5678",
    availableLanguage: "Korean",
    address: {
      street: "강남구 테헤란로 152 강남파이낸스센터 12층", // 도로명 주소
      region: "서울특별시", // 지역 : 시 단위
      Locality: "강남구", // 소재 : 구 단위
      postalCode: "06236", // 우편번호
      country: "KR", // 국가 코드
    },

    work: [
      {
        openWeek: ["월", "화", "수", "목", "금"], // 영업일
        openTime: "09:00", // 영업시간
        closeTime: "18:00", // 영업시간
      },
    ],
    payment: {
      priceRange: "원", // 가격대 표시 (₩ , $ , € , £ , ¥ , etc)
      accepted: "현금, 신용카드, 계좌이체", // 결제수단
      currenciesAccepted: "KRW", // 화폐단위
    },
  },
};
