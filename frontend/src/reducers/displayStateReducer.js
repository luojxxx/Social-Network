export const displayState = (state = {
  pageLoading: true,
  subheading: '',
  pages: 0,
  pendingPostState: '', 
  bannerMsg: ''
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

    case 'PAGE_LOADED_IN_ORDER':
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
      pendingPostState: 'pending'
    }

    case 'ERROR_POST':
    return {
      ...state,
      pendingPostState: 'error'
    }

    case 'UPDATE_NEW_POST':
    return {
      ...state,
      pendingPostState: 'success'
    }

    case 'UPDATE_EDIT_POST':
    return {
      ...state,
      pendingPostState: 'success'
    }

    case 'UPDATE_BANNER_MESSAGE':
    return {
      ...state,
      bannerMsg: action.payload
    }

    default:
    return state
  }
}
