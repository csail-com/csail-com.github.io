import { mySite } from "@/libs/site/mySite";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: mySite.name,
    short_name: mySite.name,
    description: mySite.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicons/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicons/favicon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    // screenshots: [
    //   {
    //     src: "/screenshots/screenshot1.png",
    //     sizes: "1080x1920",
    //     type: "image/png",
    //     label: "디블에이전시 홈 화면",
    //   },
    // ], // 스크린샷이미지
    orientation: "portrait",
    id: "/",
    scope: "/",
    lang: "ko",
    dir: "ltr",
    prefer_related_applications: false,
    categories: mySite.keywords,
  };
}
