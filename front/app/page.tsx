'use client';
import { useEffect, useState } from 'react';

import Button from '../components/base/Button';
import Input from '../components/base/Input';
import useInput from '../hooks/useInput';
import {userLogin} from "../lib/apis/uaer";
import {AxiosError} from "axios";
import BasicLayout from "../components/layouts/BasicLayout";
import Link from "next/link";
import fetcher from "../lib/fetcher";
import useSWR from 'swr'




export default function Page() {


  const [value, onChangeValue, resetValue] = useInput('');

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  const onClickTest = async () => {
    // try {
    //   console.log(res);
    // } catch (e) {
    //   console.error('error', e);
    // }
  };

  const onClickTest2 = async () => {
    try {
      const res = await userLogin({username: 'string', password: 'string' });
      console.log(res);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        console.log(response.data)
        throw { status: response.status, data: response.data };
      }
      throw error;
    }
  };

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
        <div onClick={onClickTest}>통신 테스트</div>
        <div onClick={onClickTest2}>통신 테스트2</div>

        <div className="mt-4">
          <p>링크박스</p>
          <div>
            <Link href="/about">
              about
            </Link>
          </div>
        </div>
      </BasicLayout>
    </>
  );
}
