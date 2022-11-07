
import apiCreator from '../apiCreator';
import { type User } from './types'

export const test = async () => {
  const response = await apiCreator.get('/test')
  return response.data
}


export const testPost = async (params: User) => {
  const response = await apiCreator.post('/test', params)
  return response.data
}

