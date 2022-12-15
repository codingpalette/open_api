'use client';

import {useEffect} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import fetcher from "../../lib/fetcher";
import {useRouter} from "next/navigation";
import {userTokenRefresh} from "../../lib/apis/user";
import BasicLayout from "../layouts/BasicLayout";

type Props = {
  children: React.ReactNode;
  userData: object
};

export default function DefaultWrapper ({ children, userData }: Props) {
  const queryClient = useQueryClient();

  // 라우터
  const router = useRouter()

  const {data: meData, isLoading, isError, error} = useQuery({
    queryKey: ['user_me'],
    queryFn: () => fetcher('/api/v1/users/me') ,
    initialData: userData
  })

  useEffect(() => {
    console.log(meData)
    if (meData.result === 'success') {
      // 유저 불러오기 성공시 토큰 리프레시 함수 실행
      tokenRefresh()
    }
  }, [meData])

  // 토큰 리프레시 함수
  const tokenRefresh = async () => {
    try {
      // 유저 엑세트 토큰을 갱신시켜준다.
      await userTokenRefresh()
      onLoginSuccess();
    } catch (e) {
      // 리프레시에 실패하면 로그인 화면으로 이동
      /*
      * 실패 조건
      * 1. 서버오류
      * 2. 리프레시 토큰 기간 만료
      * **/
      queryClient.setQueryData(['user_me'], undefined);
      // await mutate(undefined)
    }
  };


  const onLoginSuccess = () => {
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
    setTimeout(() => {
      tokenRefresh();
    }, JWT_EXPIRY_TIME - 60000);
  };

  return(
    <>
      <BasicLayout>
        {children}
      </BasicLayout>
    </>
  )
}