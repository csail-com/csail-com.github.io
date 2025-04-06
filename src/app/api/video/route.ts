import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing video URL", { status: 400 });
  }

  try {
    // URL에서 파일 경로 추출
    const filePath = path.join(process.cwd(), "public", url);

    // 파일 존재 여부 확인
    if (!fs.existsSync(filePath)) {
      return new NextResponse(`Video file not found: ${url}`, { status: 404 });
    }

    // 비디오 파일 스트리밍
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const videoRange = request.headers.get("range");

    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(filePath, { start, end });

      return new NextResponse(file as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "video/mp4",
        },
      });
    } else {
      return new NextResponse(fs.createReadStream(filePath) as any, {
        headers: {
          "Content-Length": fileSize.toString(),
          "Content-Type": "video/mp4",
        },
      });
    }
  } catch (error) {
    console.error("Video API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
