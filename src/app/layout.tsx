import AppProvider from "@/libs/provider/AppProvider";
import { mySite } from "@/libs/site/mySite";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: mySite.title,
    template: `%s | ${mySite.name}`,
  },
  description: mySite.description,
  keywords: mySite.keywords,
  authors: [{ name: mySite.business.author, url: mySite.url }],
  creator: mySite.name,
  publisher: mySite.name,
  category: mySite.category,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || mySite.url),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
    },
  },
  // SNS 공유용 이미지 및 정보 설정
  openGraph: {
    title: {
      default: mySite.title,
      template: `%s | ${mySite.name}`,
    },
    description: mySite.description,
    url: process.env.NEXT_PUBLIC_BASE_URL || mySite.url,
    siteName: mySite.name,
    locale: "ko_KR",
    type: "website",
    // 공유용 이미지 추가
    images: [
      {
        url: mySite.ogImageUrl, // public 폴더에 이미지 추가 필요
        width: 1200,
        height: 630,
        alt: mySite.name + " | " + mySite.description,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: mySite.title,
    description: mySite.description,
    images: [mySite.ogImageUrl], // Twitter용 이미지 (public 폴더에 추가 필요)
    creator: "@dbleagency", // 트위터 계정이 있다면 추가
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // 소유권 확인 코드 (필요에 따라 추가)
    google: "googleVerificationCode",
  },
  themeColor: "#ffffff",
  applicationName: mySite.name,
  appleWebApp: {
    capable: true,
    title: mySite.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },
  // PWA 관련 설정
  manifest: "/manifest.json", // 매니페스트 파일 링크
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "any" },
    ],
    apple: [
      {
        url: "/favicons/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        url: "/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "apple-touch-icon",
      },
      {
        url: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        rel: "apple-touch-icon",
      },
    ],
  },
  // Safari에서 PWA 경험을 위한 설정
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": mySite.name,
  },
};

// JSON-LD 구조화 데이터 생성 함수
function generateJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || mySite.url;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: mySite.name,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/images/logo.png`,
      width: 160,
      height: 160,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: mySite.business.tel, // 실제 전화번호로 변경 필요
      contactType: "customer service",
      availableLanguage: mySite.business.availableLanguage,
    },
    sameAs: [
      "https://www.facebook.com/dbleagency", // 실제 소셜 미디어 URL로 변경 필요
      "https://www.instagram.com/dbleagency",
      "https://blog.naver.com/dbleagency",
    ],
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: mySite.name,
    description: mySite.description,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: mySite.business.companyName, // 정확한 법인명 사용
    url: baseUrl,
    telephone: mySite.business.tel, // 서울 지역번호 포함한 형식
    address: {
      "@type": "PostalAddress",
      streetAddress: mySite.business.address.street, // 도로명 주소 형식
      addressLocality: mySite.business.address.Locality, // 구 단위
      addressRegion: mySite.business.address.region,
      postalCode: mySite.business.address.postalCode,
      addressCountry: mySite.business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.500626, // 강남역 부근 실제 위도
      longitude: 127.036489, // 강남역 부근 실제 경도
    },
    openingHoursSpecification: mySite.business.work.map((work) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: work.openWeek,
      opens: work.openTime,
      closes: work.closeTime,
    })),
    priceRange: mySite.business.payment.priceRange, // 가격대 표시
    paymentAccepted: mySite.business.payment.accepted, // 결제수단
    currenciesAccepted: mySite.business.payment.currenciesAccepted, // 화폐단위
    image: `${baseUrl}/images/office-photo.jpg`, // 사무실 이미지
    logo: `/favicons/logo.png`,
    sameAs: mySite.sns,
  };

  return [organizationLd, websiteLd, localBusinessLd];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdArray = generateJsonLd();

  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${mySite.title} RSS Feed`}
          href="/rss.xml"
        />
        {jsonLdArray.map((jsonLd, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ))}
      </head>
      <body suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
