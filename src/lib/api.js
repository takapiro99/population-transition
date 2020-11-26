import axios from 'axios'

const baseURL = 'https://opendata.resas-portal.go.jp/'

const customHeaders = { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY }

/**
 * get all prefectures from RESAS API
 * @returns {Array} array of pref objects
 */
export const getPrefectures = async () => {
  const response = await axios.get(baseURL + 'api/v1/prefectures', {
    headers: customHeaders
  })
  // console.log(response)
  // status code is somehow always 200
  // ここを共通化しておきたい
  if (response.data.message) {
    console.error(response.data.description)
    throw new Error(response.data.message)
  }
  if (response.data.result) {
    return response.data.result
  }
  return new Error('cannot fetch prefecture data')
}

/**
 * get population transition of given prefecture
 * @param {Object} pref - prefObject
 * @returns {Array} Array of data of total population
 */
export const getPopulation = async (pref) => {
  const res = await axios.get(baseURL + 'api/v1/population/composition/perYear', {
    headers: customHeaders,
    params: {
      prefCode: pref.prefCode,
      cityCode: '-'
    }
  })
  if (res.data.message) {
    console.error(res.data.description)
    throw new Error(res.data.message)
  }
  if (res.data === '400') {
    throw new Error('invalid request?')
  }
  if (!res.data.result) {
    // no data
    console.log(res)
    throw new Error('no content')
  }
  const data = { pref: pref, data: res.data.result.data[0].data }
  return data
}
