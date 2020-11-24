import axios from 'axios'

const baseURL = 'https://opendata.resas-portal.go.jp/'

const customHeaders = { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY }

export const getPrefectures = async () => {
  return axios.get(baseURL + 'api/v1/prefectures', {
    headers: customHeaders
  })
}
