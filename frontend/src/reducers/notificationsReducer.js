export const notifications = (state = {
  data: []
}, action) => {
  switch (action.type) {
    case 'LOADED_NOTIFICATIONS':
    return {
      ...state,
      data: action.payload
    }

    default:
    return state
  }
}
