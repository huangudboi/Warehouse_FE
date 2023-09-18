import request from '../request'
import { API } from '../list-api'

const loginAPI = async (params) => {
  return await request.post(API.LOGIN, params)
}

const registerAPI = async (params) => {
  return await request.post(API.REGISTER, params)
}

export { loginAPI, registerAPI }
