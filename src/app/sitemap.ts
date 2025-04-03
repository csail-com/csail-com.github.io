import { menus } from "@/libs/site/menus";
import { mySite } from "@/libs/site/mySite";
import { MetadataRoute } from "next";

/**
 * 디블에이전시 웹사이트의 동적 사이트맵 생성
 * 검색엔진 최적화를 위한 페이지 우선순위 및 업데이트 빈도 설정
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = mySite.url;

  // 현재 날짜를 lastModified로 사용
  const currentDate = new Date().toISOString();

  // 홈페이지 항목 (최우선순위)
  const homeItem = {
    url: `${baseUrl}/`,
    lastModified: currentDate,
    changeFrequency: "daily" as const,
    priority: 1.0,
  };

  // 메뉴 기반 사이트맵 항목 생성 (홈 제외)
  const otherRoutes = menus
    .filter((menu) => menu.url !== "/")
    .map((menu) => {
      return {
        url: `${baseUrl}${menu.url}`,
        lastModified: currentDate,
        changeFrequency: "daily" as const,
        priority: 0.8,
      };
    });

  // 추가 중요 페이지 (필요시 추가)
  const additionalPages = [
    // 예: 서비스 상세 페이지, 포트폴리오 상세 등 (있는 경우 추가)
  ];

  // 모든 항목 합치기 (홈페이지를 가장 먼저 위치)
  return [homeItem, ...otherRoutes, ...additionalPages];
}
