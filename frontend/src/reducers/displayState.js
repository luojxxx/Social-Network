export const displayState = (state = {
  showPostBoxId: '',
  reportConfirmationId: '',
  showPostDescriptionIds: [],
  sharePost: null,
  pages: 0
}, action) => {
  switch (action.type) {

    case 'SHOW_POST_BOX':
    if (state.showPostBoxId === action.payload) {
      return {
        ...state,
        showPostBoxId: ''
      }
    } else {
      return {
        ...state,
        showPostBoxId: action.payload
      }
    }

    case 'CLOSE_POST_BOX':
    return {
      ...state,
      showPostBoxId: ''
    }

    case 'SET_TOTAL_PAGES':
    return {
      ...state,
      pages: action.payload
    }

    default:
    return state
  }
}
