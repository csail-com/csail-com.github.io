// 캐시 이름 및 버전 관리
const CACHE_NAME = "dbleagency-cache-v1";

// 메뉴에서 캐시할 페이지 URL 가져오기
const menuUrls = [
  { name: "홈", url: "/" },
  { name: "문의하기", url: "/contactus" },
  { name: "포트폴리오", url: "/portfolios" },
  { name: "디자인", url: "/designs" },
  { name: "위젯", url: "/widgets" },
  { name: "FAQ", url: "/faq" },
].map((menu) => menu.url);

// 캐시할 파일 목록
const urlsToCache = [
  ...menuUrls,
  "/offline",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/images/logo.png",
];

// 서비스 워커 설치 및 캐시 설정
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// 서비스 워커 활성화 및 이전 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 네트워크 요청 가로채기 및 캐시 전략 구현
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에서 찾았으면 반환
      if (response) {
        return response;
      }

      // 캐시에 없으면 네트워크에서 가져오기
      return fetch(event.request)
        .then((response) => {
          // 유효한 응답인지 확인
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // 응답 복제 후 캐시에 저장
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // 오프라인일 때 오프라인 페이지 제공
          if (event.request.destination === "document") {
            return caches.match("/offline");
          }
        });
    })
  );
});
