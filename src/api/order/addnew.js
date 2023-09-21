import request from '../request'
import { API } from '../list-api'

const addNewAPI = async (params) => {
  return await request.post(API.CREATE, params)
}

export { addNewAPI }
