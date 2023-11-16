import axios from 'axios'

export const SERVER_BASE_URL = process.env.REACT_APP_API_SERVER
export const API_SERVER_URL = SERVER_BASE_URL + '/api/management'

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('authtoken'))
  return { authorization: user.accessToken }
}
export const axiosRequest = {
  get: async (url, params) => {
    return await axios.get(url + '?' + new URLSearchParams(params || {}), { headers: authHeader() })
  },
  post: async (url, data) => {
    return await axios.post(url, data || {}, { headers: authHeader() })
  },
  put: async (url, data) => {
    return await axios.put(url, data || {}, { headers: authHeader() })
  },
  delete: async (url, data) => {
    return await axios.delete(url, { headers: authHeader() })
  },
}
