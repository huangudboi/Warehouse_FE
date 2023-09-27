import request from '../request'
import { API } from '../list-api'

const reportTotalAPI = async (params) => {
  return await request.post(API.NUMBERORDER, params)
}

const efficiencyAPI = async (params) => {
  return await request.post(API.EFFICIENCY, params)
}

const createLabelAPI = async (params) => {
  return await request.post(API.LABEL, params)
}

export { reportTotalAPI, efficiencyAPI, createLabelAPI }
