import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.example.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 필요한 경우 인증 토큰을 위한 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 필요한 경우 여기에 인증 헤더 추가
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 오류 처리를 위한 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 전역 오류 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
