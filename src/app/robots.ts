import { menus } from "@/libs/site/menus";
import { mySite } from "@/libs/site/mySite";
import { MetadataRoute } from "next";

/**
 * 디블에이전시 웹사이트의 robots.txt 설정
 * 검색 엔진 최적화를 위한 크롤링 규칙 설정
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = mySite.url;

  // menus.ts에서 URL 가져와서 allow 배열 생성
  const allowUrls = menus.map((menu) =>
    menu.url === "/" ? "/" : `${menu.url}/`
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: allowUrls,
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
