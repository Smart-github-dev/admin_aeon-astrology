// import { json } from 'react-router-dom'
const counterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      localStorage.setItem('authtoken', JSON.stringify(action.data))
      return action.data
    case 'LOGOUT':
      localStorage.removeItem('authtoken')
      return {}
    default:
      return state
  }
}

export default counterReducer
