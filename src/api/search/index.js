import request from '../request'
import { API } from '../list-api'

const searchAPI = async() => {
  return await request.get(API.SEARCH)
}

export { searchAPI }