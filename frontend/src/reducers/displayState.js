export const displayState = (state = {
  pageLoading: true,
  showPostBoxId: '',
  pendingPostBoxId: '', 
  reportConfirmationId: '',
  showPostDescriptionIds: [],
  sharePost: null,
  pages: 0
}, action) => {
  switch (action.type) {

    case 'PAGE_LOADING':
    return {
      ...state,
      pageLoading: true
    }

    case 'PAGE_LOADED':
    return {
      ...state,
      pageLoading: false
    }

    case 'SEARCH_PAGE_LOADED':
    return {
      ...state,
      pageLoading: false
    }

    case 'LOADED_NOTIFICATIONS':
    return {
      ...state,
      pageLoading: false
    }

    case 'SHOW_POST_BOX':
    if (state.showPostBoxId === action.payload.parentId) {
      return {
        ...state,
        showPostBoxId: ''
      }
    } else {
      return {
        ...state,
        showPostBoxId: action.payload.parentId
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
