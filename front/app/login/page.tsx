'use client';

import {userCreate, userLogin, userMe} from "../../lib/apis/user";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Button from "../../components/base/Button";


export default function login () {
  const router = useRouter()
  const {data, isLoading, isError, mutate} = userMe()

  const onClickUserCreate = async () => {
    try {
      await userCreate({user_login_id:'string', user_password:'string'})
    } catch (e) {
      const { response } = e as unknown as AxiosError;
      if (response) {
        throw { status: response.status, data: response.data };
      }
      throw e;
    }
  }

  const onClickLogin = async () => {
    try {
      await userLogin({user_login_id:'string', user_password: 'string'})
      await mutate()
    } catch (e) {
      const { response } = e as unknown as AxiosError;
      if (response) {
        throw { status: response.status, data: response.data };
      }
      throw e;
    }
  }

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
      <div>
        <p>회원가입</p>
        <Button onClick={onClickUserCreate}>회원가입</Button>
      </div>
      <div>
        <p>로그인</p>
        <Button onClick={onClickLogin}>로그인</Button>
      </div>
    </>
  )
}