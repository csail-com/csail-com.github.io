import { menus } from "@/libs/site/menus";
import { mySite } from "@/libs/site/mySite";

export async function GET() {
  // 현재 날짜를 RFC822 형식으로 변환 (RSS 표준)
  const pubDate = new Date().toUTCString();

  // RSS 피드 생성
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${mySite.name} - ${mySite.title}</title>
    <link>${mySite.url}</link>
    <description>${mySite.description}</description>
    <language>ko-KR</language>
    <managingEditor>${mySite.business.email} (${
    mySite.business.author
  })</managingEditor>
    <webMaster>${mySite.business.email} (${mySite.business.author})</webMaster>
    <lastBuildDate>${pubDate}</lastBuildDate>
    <atom:link href="${
      mySite.url
    }/rss.xml" rel="self" type="application/rss+xml" />
    <category>${mySite.category}</category>
    
    <!-- 메뉴 항목을 RSS 아이템으로 변환 -->
    ${menus
      .map(
        (menu) => `
    <item>
      <title>${menu.name}</title>
      <link>${mySite.url}${menu.url}</link>
      <description>${mySite.description}</description>
      <guid isPermaLink="true">${mySite.url}${menu.url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${mySite.business.email} (${mySite.business.author})</author>
      <category>${mySite.category}</category>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  // XML 응답 반환
  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml;charset=utf-8",
    },
  });
}
