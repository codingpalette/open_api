"use client";
import {useEffect, useState} from "react";

import Button from "../components/base/Button";
import styled from '@emotion/styled'
import tw from 'twin.macro';
import Input from "../components/base/Input";
import useInput from "../hooks/useInput";


export default function Page() {
  const [value, onChangeValue, resetValue] = useInput('')

  useEffect(() => {
    console.log('value', value)
  }, [value])


  return (
    <>
      <h1>Hello, Next.js!</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button onClick={resetValue}>
        리셋 버튼
      </Button>
      <div>
        <Input value={value} onChange={onChangeValue}  />
      </div>
    </>
  );
}

