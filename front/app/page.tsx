"use client";

import styled from '@emotion/styled'
import tw from 'twin.macro';


export default function Page() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button>This is a hotpink button.</Button>
      <Button2>2222</Button2>
    </>
  );
}

const Button = styled.button`
  color: hotpink;
`

const Button2 = styled.div`
  ${tw`text-green-500`}
`
