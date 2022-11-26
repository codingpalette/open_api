
import { cookies, headers } from 'next/headers';

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

  console.log('data', data)

  return(
    <>
      SSR PAGE
      <div>
        {data?.user_id}
      </div>
      <div>
        {data.user_login_id}
      </div>
    </>
  )
}

export default Page