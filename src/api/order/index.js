import request from '../request'
import { API } from '../list-api'

const addNewAPI = async (params) => {
  return await request.post(API.CREATE, params)
}

const deleteOrderAPI = async (params) => {
  return await request.delete(`${API.DELETE}/${params}`)
}

const changeStatusAPI = async (params) => {
  return await request.put(
    `${API.STATUS}?orderCode=${params.orderCode}&type=${params.type}&missReasonId=${params.missReasonId}`
  )
}

export { addNewAPI, deleteOrderAPI, changeStatusAPI }
