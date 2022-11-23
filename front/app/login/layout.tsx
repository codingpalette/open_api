'use client';


import {useRouter} from "next/navigation";
import {userMe} from "../../lib/apis/user";
import {useEffect} from "react";

export default function Layout({ children }: { children: React.ReactNode }) {


  // const router = useRouter()
  // const {data, isLoading, isError, mutate} = userMe()
  //
  //
  // useEffect(() => {
  //   if (data) {
  //     router.replace("/");
  //   }
  // }, [data]);
  //
  // if (isLoading || !isError) {
  //   return (
  //     <>
  //       loading...
  //     </>
  //   )
  // }

  return(
    <>
      <div>{children}</div>
    </>
  )
}