import {useRouter} from "next/navigation";
import {userMe, userTokenRefresh} from "../../lib/apis/user";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";


const BasicLayout = ({children,}: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  // 라우터
  const router = useRouter()
  // 유저 react-query로 불러오기
  const {data: userData, isLoading, isError} = userMe()

  useEffect(() => {
    console.log('isLoading', isLoading)
  }, [isLoading])

  useEffect(() => {
    console.log('isError', isError)
  }, [isError])

  useEffect(() => {
    if (userData) {
      // 유저 불러오기 성공시 토큰 리프레시 함수 실행
      tokenRefresh()
    }
  }, [userData])

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

  // 유저 에러가 발생이 되면 로그인 페이지로 이동
  useEffect(() => {
    if (isError) {
      router.replace('/login')
    }
  }, [isError])

  // 유저 로딩 기다림
  if (isLoading || isError) {
    return (
      <>
        loading...
      </>
    )
  }

  return(
    <>
      <div>header</div>
      <div>
        {children}
      </div>
    </>
  )
}

export default BasicLayout