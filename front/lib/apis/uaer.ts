import apiCreator from "../apiCreator";
import {UserLogin} from "../types/uaer_type";
import fetcher from "../fetcher";
import useSWR from 'swr'


// 유저 로그인 api
export const userLogin = async (params: UserLogin) => {
  const response = await apiCreator.post('/api/v1/users/login', params)
  return response.data
}

// 유저 테스트 api
export const userTest = async () => {
  const response = await apiCreator.post('/api/v1/users/test')
  return response.data
}

// 유저 me api
// export const userMe = async () => {
//   const response = await apiCreator.get('/api/v1/users/me')
//   return response.data
// }

export const userMe = () => {

  const { data, error, mutate, isValidating } = useSWR(`/api/v1/users/me`, fetcher, {
    // refreshInterval: 1000
  })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}
