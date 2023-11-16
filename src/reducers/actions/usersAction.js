import { axiosRequest } from './index'

import { API_SERVER_URL } from './'

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axiosRequest.get(`${API_SERVER_URL}/user/getusers`)
    dispatch({ type: 'SET_USERS', data: res.data })
  } catch (error) {
    console.log(error)
  }
}
