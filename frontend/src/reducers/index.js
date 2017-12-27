import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const routing = routerReducer;

const displayedPosts = (state = {
  data: []
}, action) => {
  switch (action.type) {
    case 'FRONTPAGE_LOADED':
    return {
      ...state,
      data: action.payload
    }

    case 'ADD_POST_TO_DISPLAY':
    return {
      ...state,
      data: [action.payload, ...state.data]
    }

    case 'UP_VOTE':
    return {
      ...state,
    }

    case 'DOWN_VOTE':
    return {
      ...state,
    }

    default:
    return state;
  }
}

const userAccount = (state = {
  loggedIn: false,
  userName: 'Anon',
  email: '',
  submitted: [],
  voteHistory: {},
  saved: []
}, action) => {
  switch (action.type) {
    case 'USERDATA_LOADED':
    return {
      ...state,
      loggedIn: true,
      userName: action.payload.userName,
      email: action.payload.email,
      submitted: action.payload.submitted,
      voteHistory: action.payload.voteHistory,
      saved: action.payload.saved
    }

    case 'USERDATA_LOADFAILED':
    return {
      ...state,
      loggedIn: false,
      userName: 'Anon',
      email: '',
      submitted: [],
      voteHistory: {},
      saved: []
    }

    case 'LOGOUT':
    localStorage.removeItem('token');
    return {
      ...state,
      loggedIn: false,
      userName: 'Anon',
      email: '',
      submitted: [],
      voteHistory: {},
      saved: []
    }

    default:
    return state;
  }
}

const displayState = (state = {
  showPostBoxId: ''
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

    default:
    return state;
  }
}

const reducers = combineReducers({
  routing,
  displayedPosts,
  userAccount,
  displayState
})

export default reducers