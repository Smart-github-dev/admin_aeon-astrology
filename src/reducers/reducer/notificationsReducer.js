const initialState = []
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return action.data
    default:
      return state
  }
}

export default counterReducer
