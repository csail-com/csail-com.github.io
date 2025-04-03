import { menus } from "@/libs/site/menus";
import { mySite } from "@/libs/site/mySite";
import fs from "fs";
import path from "path";

// Define a type for RSS items
interface RssItem {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string;
  image?: string;
}

// Properly encode HTML entities for XML
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Format date for RSS
function formatRssDate(date: Date): string {
  return date.toUTCString();
}

// Generate static menu items for RSS
function generateStaticMenuItems(): RssItem[] {
  return menus
    .filter((menu) => menu.url !== "/portfolios" && menu.url !== "/designs") // Exclude dynamic routes
    .map((menu) => {
      const now = new Date();
      return {
        title: `${mySite.name} - ${menu.name}`,
        description:
          menu.url === "/"
            ? mySite.description
            : `${mySite.name}의 ${menu.name} 페이지입니다.`,
        link: `${mySite.url}${menu.url}`,
        guid: `${mySite.url}${menu.url}`,
        pubDate: formatRssDate(now),
      };
    });
}

// Fetch dynamic content from portfolio and designs
async function fetchDynamicContent(): Promise<RssItem[]> {
  const dynamicSources = [
    {
      filePath: "src/libs/api/portfolio.json",
      urlPrefix: "/portfolios",
      idField: "_id",
      imageField: "thumbnail",
    },
    {
      filePath: "src/libs/api/faq.json",
      urlPrefix: "/faq",
      idField: "_id",
      imageField: null,
    },
  ];

  let allItems: RssItem[] = [];

  for (const source of dynamicSources) {
    try {
      const filePath = path.join(process.cwd(), source.filePath);

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const items = JSON.parse(fileContent);

        if (Array.isArray(items)) {
          const rssItems = items.map((item: any) => {
            const pubDate = item.updatedAt || item.createdAt || new Date();
            const formattedDate = formatRssDate(new Date(pubDate));
            const link = `${mySite.url}${source.urlPrefix}/${
              item[source.idField]
            }`;
            const image = source.imageField
              ? Array.isArray(item[source.imageField])
                ? item[source.imageField][0]
                : item[source.imageField]
              : undefined;

            return {
              title:
                item.title ||
                item.serviceName ||
                `${mySite.name} - ${item[source.idField] || ""}`,
              description: item.description || item.q || mySite.description,
              link,
              guid: link,
              pubDate: formattedDate,
              image,
            };
          });

          allItems = [...allItems, ...rssItems];
        }
      }
    } catch (error) {
      console.error(`Error reading or parsing ${source.filePath}:`, error);
    }
  }

  return allItems;
}

// Main handler function
export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || mySite.url;
    const now = new Date();

    // Get static and dynamic content
    const staticItems = generateStaticMenuItems();
    const dynamicItems = await fetchDynamicContent();
    const allItems = [...staticItems, ...dynamicItems];

    // Generate XML for items
    const itemsXml = allItems
      .map((item) => {
        const imageTag = item.image
          ? `<enclosure url="${escapeXml(
              item.image
            )}" type="image/jpeg" length="0" />`
          : "";

        return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
      <pubDate>${item.pubDate}</pubDate>
      ${imageTag}
    </item>`;
      })
      .join("\n");

    // Build full RSS XML
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${mySite.title}]]></title>
    <link>${escapeXml(baseUrl)}</link>
    <description><![CDATA[${mySite.description}]]></description>
    <language>ko</language>
    <lastBuildDate>${formatRssDate(now)}</lastBuildDate>
    <atom:link href="${escapeXml(
      baseUrl
    )}/rss.xml" rel="self" type="application/rss+xml" />
    <category><![CDATA[${mySite.category}]]></category>
    <copyright><![CDATA[Copyright © ${new Date().getFullYear()} ${
      mySite.business.companyName
    }]]></copyright>
    <webMaster>${escapeXml(mySite.business.email)} (${escapeXml(
      mySite.business.author
    )})</webMaster>
    <image>
      <url>${escapeXml(baseUrl)}/favicons/logo.png</url>
      <title><![CDATA[${mySite.title}]]></title>
      <link>${escapeXml(baseUrl)}</link>
    </image>${itemsXml}
  </channel>
</rss>`;

    // Return RSS XML with proper headers
    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
