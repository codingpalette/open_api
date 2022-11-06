"use client";

import Button from "../components/base/Button";
import styled from '@emotion/styled'
import tw from 'twin.macro';
import Input from "../components/base/Input";


export default function Page() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button />
      <div>
        <Input />
      </div>
    </>
  );
}

