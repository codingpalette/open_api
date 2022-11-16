import apiCreator from "../apiCreator";
import {UserLogin} from "../types/uaer_type";


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
export const userMe = async () => {
  const response = await apiCreator.get('/api/v1/users/me')
  return response.data
}