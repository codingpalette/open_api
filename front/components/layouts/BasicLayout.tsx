import {useRouter} from "next/navigation";
import {userMe, userTokenRefresh} from "../../lib/apis/user";
import {useEffect} from "react";


const BasicLayout = ({children,}: { children: React.ReactNode }) => {

  const router = useRouter()

  const {data: userData, isLoading, isError, mutate} = userMe()


  useEffect(() => {
    if (userData) {
      tokenRefresh()
    }
  }, [userData])

  const tokenRefresh = async () => {
    try {
      await userTokenRefresh()
      onLoginSuccess();
    } catch (e) {
      await mutate(undefined)
    }
  };


  const onLoginSuccess = () => {
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
    setTimeout(() => {
      tokenRefresh();
    }, JWT_EXPIRY_TIME - 60000);
  };


  useEffect(() => {
    if (isError) {
      router.replace('/login')
    }
  }, [isError])

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