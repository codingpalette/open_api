'use client';


import './globals.css';
import useSWR, { SWRConfig } from 'swr'
import DefaultWrapper from "../components/wrapper/DefaultWrapper";


export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
      <SWRConfig
        value={{
          revalidateOnFocus: false, //창이 포커싱되었을 때 자동 갱신
          shouldRetryOnError: false, //fetcher에 에러가 있을 때 재시도
          errorRetryCount: 0, // 최대 에러 재시도 수
          // refreshInterval: 1000 * 60 * 5 // 통신 성공시 재갱신 시간
        }}
      >
        <DefaultWrapper>
          {children}
        </DefaultWrapper>
      </SWRConfig>
      </body>
    </html>
)}