'use client';

import BasicLayout from "../../components/layouts/BasicLayout";
import Link from "next/link";
import fetcher from "../../lib/fetcher";
import useSWR from 'swr'
import {useEffect} from "react";

// async function getData() {
//   // const res = await fetch('http://localhost:8000/api/v1/users/test2', { cache: 'no-store', credentials: 'include' });
//
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, { cache: 'no-store' });
//
//   const data = await res.json();
//   return data;
// }



const Page = () => {
  // const _userTest = await getData()
  // console.log('user_test', _userTest)

  // const { data: meData2 } = useSWR(`/api/v1/users/me`, fetcher)
  //
  // useEffect(() => {
  //   console.log('meData', meData2)
  // }, [meData2])

  return (
    <>
      <BasicLayout>
        <div>test</div>
        <div className="mt-4">
          <p>링크박스</p>
          <div>
            <Link href="/">
              home
            </Link>
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default Page;
