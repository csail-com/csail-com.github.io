"use server";

import sharp from "sharp";

/**
 * 이미지의 메타데이터를 가져오는 서버 액션
 * 이 함수는 서버에서만 실행되므로 Node.js 모듈을 안전하게 사용할 수 있습니다.
 */
export async function getImageMetadata(imageUrl: string) {
  try {
    // 이미지 데이터 가져오기
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
      return null;
    }

    // 이미지 버퍼로 변환
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // sharp를 사용하여 이미지 메타데이터 추출
    const metadata = await sharp(buffer).metadata();

    if (metadata.width && metadata.height) {
      return {
        width: metadata.width,
        height: metadata.height,
        aspectRatio: metadata.width / metadata.height,
        format: metadata.format,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching image metadata:", error);
    return null;
  }
}

/**
 * 이미지를 WebP 형식으로 최적화하는 서버 액션
 * 사용자 브라우저 window.devicePixelRatio와 요청 크기에 맞춰 최적화합니다.
 */
export async function optimizeImage(
  imageUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    pixelRatio?: number;
  } = {}
) {
  try {
    // 기본 옵션 설정
    const { width = 1080, quality = 80, pixelRatio = 1 } = options;

    // 디바이스 픽셀 비율에 맞게 실제 요청 너비 계산
    const targetWidth = Math.round(width * pixelRatio);

    // 이미지 데이터 가져오기
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
      return null;
    }

    // 이미지 버퍼로 변환
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 이미지 메타데이터 가져오기
    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return null;
    }

    // 원본 이미지보다 큰 크기로 요청하지 않도록 조정
    const resizeWidth = Math.min(targetWidth, metadata.width);

    // 이미지 최적화 및 WebP 변환
    const webpBuffer = await sharp(buffer)
      .resize({
        width: resizeWidth,
        withoutEnlargement: true,
        fit: "inside",
      })
      .webp({
        quality,
        lossless: false,
        nearLossless: false,
        smartSubsample: true,
        effort: 6, // 압축 노력도 (0-6)
      })
      .toBuffer();

    // Base64 문자열로 변환
    const webpBase64 = `data:image/webp;base64,${webpBuffer.toString(
      "base64"
    )}`;

    return {
      webpBase64,
      originalFormat: metadata.format,
      width: resizeWidth,
      height: Math.round(resizeWidth * (metadata.height / metadata.width)),
      aspectRatio: metadata.width / metadata.height,
    };
  } catch (error) {
    console.error("Error optimizing image:", error);
    return null;
  }
}

/**
 * 이미지의 블러 플레이스홀더를 생성하는 서버 액션
 */
export async function generateBlurPlaceholder(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 매우 작은 크기로 플레이스홀더 생성 (10-20px)
    const placeholderBuffer = await sharp(buffer)
      .resize(20, 20, { fit: "inside" })
      .webp({ quality: 50 })
      .toBuffer();

    return `data:image/webp;base64,${placeholderBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Error generating blur placeholder:", error);
    return null;
  }
}
