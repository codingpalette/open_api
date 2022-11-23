import apiCreator from "../apiCreator";
import {UserCreate, UserLogin} from "../types/uaer_type";
import fetcher from "../fetcher";
import useSWR from 'swr'
import {useQuery} from "@tanstack/react-query";


// 유저 회원가입 api
export const userCreate = async (params: UserCreate) => {
  const res = await apiCreator.post('/api/v1/users/create', params)
  return res.data
}

// 유저 로그인 api
export const userLogin = async (params: UserLogin) => {
  const res = await apiCreator.post('/api/v1/users/login', params)
  return res.data
}

// 유저 me api
// export const userMe = () => {
//   const { data, error, mutate, isValidating } = useSWR(`/api/v1/users/me`, fetcher, {
//     // refreshInterval: 1000
//   })
//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//     mutate
//   }
// }

export const userMe = () => {
  // Queries
  const {data, isLoading, isError, error} = useQuery({ queryKey: ['user_me'], queryFn: () => fetcher('/api/v1/users/me') })
  return {
    data,
    isLoading,
    isError,
    error
  }
}

// 유저 토큰 갱신 api
export const userTokenRefresh = async () => {
  const res = await apiCreator.get('/api/v1/users/token_refresh')
  return res.data
}

// 유저 로그아웃 api
export const userLogout = async () => {
  const res = await apiCreator.post('/api/v1/users/logout')
  return res.data
}

// 쿼리 테스트 api
export const userQuery = (where: any) => {

  let addWhere = ""
  for (const [key, value] of Object.entries(where)) {
    if (value !== "") {
      addWhere += `${key}=${value}&`
    }
  }
  console.log(addWhere)

  const { data, error} = useSWR(`/api/v1/users/query?${addWhere}`, fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
