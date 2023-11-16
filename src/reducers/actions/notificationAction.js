import { axiosRequest } from './index'

import { API_SERVER_URL } from './'

export const getNotifications = () => async (dispatch) => {
  try {
    const res = await axiosRequest.get(`${API_SERVER_URL}/notification/all`)
    dispatch({ type: 'SET_NOTIFICATIONS', data: res.data })
  } catch (error) {
    console.log(error)
  }
}
