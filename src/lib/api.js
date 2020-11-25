import axios from 'axios'

const baseURL = 'https://opendata.resas-portal.go.jp/'

const customHeaders = { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY }

export const getPrefectures = async () => {
  const response = await axios.get(baseURL + 'api/v1/prefectures', {
    headers: customHeaders
  })
  // console.log(response)
  // status code is somehow always 200
  if (response.data.message) {
    console.error(response.data.description)
    throw new Error(response.data.message)
  }
  if (response.data.result) {
    return response.data.result
  }
  return new Error('cannot fetch prefecture data')
}
