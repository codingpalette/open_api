'use client';
import { useEffect } from 'react';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import useInput from '../hooks/useInput';
import {userLogout, userMe} from "../lib/apis/user";
import BasicLayout from "../components/layouts/BasicLayout";
import Link from "next/link";




export default function Page() {
  // const {data, isLoading, isError, mutate} = userMe()


  const [value, onChangeValue, resetValue] = useInput('');

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  const onClickLogout = async () => {
    try {
      // const res = await userLogout()
      // console.log('res', res)
      // await mutate(undefined)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <BasicLayout>
        <h1>Hello, Next.js!</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Button theme="primary" onClick={resetValue}>
          리셋 버튼
        </Button>
        <div>
          <Input value={value} onChange={onChangeValue} />
        </div>

        <div className="mt-4">
          <p>링크박스</p>
          <div>
            <Link href="/about">
              about
            </Link>
          </div>
        </div>

        <div>
          <div>sdfsd</div>
          {process.env.NEXT_PUBLIC_MOVIE_APP_KEY}
        </div>
        
        <div>
          <p>로그아웃</p>
          <Button onClick={onClickLogout}>로그아웃</Button>
        </div>
      </BasicLayout>
    </>
  );
}
