'use client';

import {userLogin, userMe} from "../../lib/apis/uaer";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {useEffect} from "react";


export default function login () {
  const router = useRouter()
  const {data, isLoading, isError, mutate} = userMe()



  const onClickTest2 = async () => {
    try {
      const res = await userLogin({username: 'string', password: 'string' });
      console.log(res);
      await mutate()
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        console.log(response.data)
        throw { status: response.status, data: response.data };
      }
      throw error;
    }
  };


  // if (isLoading && !isError) {
  //   router.push('/')
  // }

  // useEffect(() => {
  //   if (data) {
  //     router.replace("/");
  //   }
  // }, [data]);


  return(
    <>
      Login Page
      <div onClick={onClickTest2}>로그안</div>
    </>
  )
}