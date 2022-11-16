'use client';
import { useEffect, useState } from 'react';

import Button from '../components/base/Button';
import styled from '@emotion/styled';
import tw from 'twin.macro';
import Input from '../components/base/Input';
import useInput from '../hooks/useInput';
import { test, testPost } from '../lib/apis/auth';
import {userLogin} from "../lib/apis/uaer";
import {AxiosError} from "axios";




export default function Page() {

  const [value, onChangeValue, resetValue] = useInput('');

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  const onClickTest = async () => {
    try {
      const res = await test();
      console.log(res);
    } catch (e) {
      console.error('error', e);
    }
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
    </>
  );
}
