import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const routing = routerReducer;

const frontPage = (state = {
  fieldText:'', 
  frontPageList: []
  }, action) => {
  switch (action.type) {
    case 'FRONTPAGE_LOADED':
    return {
      ...state,
      frontPageList: action.payload
    }

    case 'ADD_POKEMON':
    return {
      ...state,
      pokemon: state.pokemon.concat(state.fieldText)
    }

    // case 'REMOVE_TODO':
    // return {
    //   ...state,
    //   todos: [
    //   ...state.todos.slice(0,action.idx),
    //   ...state.todos.slice(action.idx+1)
    //   ]
    // }

    case 'REMOVE_POKEMON':
    return {
      ...state,
      pokemon: state.pokemon.filter( (item,idx) => idx !== action.idx )
    }

    case 'UPDATE_FIELD':
    return {
      ...state,
      fieldText: action.text
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
    

    default:
    return state;
  }
}

const reducers = combineReducers({
  routing,
  frontPage,
  userAccount,
  displayState
})

export default reducers