export const displayState = (state = {
  pageLoading: true,
  subheading: '',
  pages: 0,
  pendingPost: false, 
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

    case 'SET_SUBHEADING':
    return {
      ...state,
      subheading: action.payload
    }

    case 'SET_TOTAL_PAGES':
    return {
      ...state,
      pages: action.payload
    }

    case 'PENDING_POST':
    return {
      ...state,
      pendingPost: true
    }

    case 'UPDATE_NEW_POST':
    return {
      ...state,
      pendingPost: false
    }

    case 'UPDATE_EDIT_POST':
    return {
      ...state,
      pendingPost: false
    }

    default:
    return state
  }
}
