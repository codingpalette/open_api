'use client';


import {useRouter} from "next/navigation";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import {useQuery} from "@tanstack/react-query";

const UserLayout = ({userData}: any) => {
  // 라우터
  const router = useRouter()

  // const { data, error, mutate, isValidating } = useSWR(`/api/v1/users/me`, fetcher, {
  //   // refreshInterval: 1000
  //   revalidateOnFocus: false,
  //
  // })


  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['user_me'],
    queryFn: () => fetcher('/api/v1/users/me') ,
    initialData: userData
  })

  console.log(data)

  return(
    <>
      <div>
        sdfs
        <div>
          {data?.user_login_id}
        </div>
      </div>
    </>
  )
}

export default UserLayout