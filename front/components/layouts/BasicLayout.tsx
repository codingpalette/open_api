import {useRouter} from "next/navigation";
import {userMe} from "../../lib/apis/uaer";
import {useEffect} from "react";


const BasicLayout = ({children,}: { children: React.ReactNode }) => {

  const router = useRouter()

  const {data, isLoading, isError} = userMe()


  useEffect(() => {
    console.log('data', data)
  }, [data])


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