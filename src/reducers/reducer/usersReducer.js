const initialState = []
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.data
    case 'SET_USER_ROLES':
      state[action.data].roles = [
        state[action.data].roles.length === 0
          ? 'access'
          : state[action.data].roles[0] === 'access'
          ? 'block'
          : 'access',
      ]
      return [...state]
    default:
      return state
  }
}

export default counterReducer
