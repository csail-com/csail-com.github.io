import { MetadataRoute } from "next";

/**
 * 디블에이전시 웹사이트의 robots.txt 설정
 * 검색 엔진 최적화를 위한 크롤링 규칙 설정
 */
export default function robots(): MetadataRoute.Robots {
  // 기본 URL 설정
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dbleagency.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/contactus/",
          "/portfolios/",
          "/designs/",
          "/widgets/",
          "/faq/",
        ],
        // not-found 페이지는 크롤링에서 제외
        disallow: [
          "/not-found",
          "/not-found/*",
          "/offline",
          "/*.json$",
          "/api/*",
        ],
        crawlDelay: 2,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
