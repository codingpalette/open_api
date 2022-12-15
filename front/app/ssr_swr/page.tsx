import {headers} from "next/headers";

import UserLayout from "../../components/layouts/UserLayout";

const fetchData = async () => {
  const headersInstance = headers()
  const authorization: any = headersInstance.get('authorization')
  const Cookie: any = headersInstance.get('Cookie')
  const res = await fetch(
    'http://127.0.0.1:8000/api/v1/users/me', {
      headers: { authorization, Cookie },
      cache: 'no-store'
    })
  const data = await res.json()
  return data
}

const Page = async () => {

  const data = await fetchData()

  return(
    <>
      <h1>SSR_SWR PAGE</h1>
      <UserLayout userData={data} />
    </>
  )
}

export default Page