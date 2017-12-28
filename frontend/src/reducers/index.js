import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const routing = routerReducer;

const displayedPosts = (state = {
  data: {},
  dataOrder: []
}, action) => {
  switch (action.type) {
    case 'PAGE_LOADED':
    var data = {};
    var dataOrder = [];
    for (var idx in action.payload) {
      var item = action.payload[idx];
      dataOrder.push(item._id);
      data[item._id] = item;
    }
    return {
      ...state,
      data: data,
      dataOrder: dataOrder
    }

    case 'ADD_POST_TO_DISPLAY':
    var newPostData = action.payload;
    var newData = Object.assign({}, state.data);
    newData[newPostData._id] = newPostData;
    var newDataOrder = [newPostData._id, ...state.dataOrder];
    return {
      ...state,
      data: newData,
      dataOrder: newDataOrder
    }

    case 'UPDATE_VOTE':
    var newData = Object.assign({}, state.data);
    var postId = action.payload.postId;
    var priorVote = action.payload.priorVote;
    var currentVote = action.payload.currentVote;

    var updateScore = 0;
    if (currentVote === priorVote) {
      updateScore = (-1*priorVote);
    } else {
      updateScore = currentVote - priorVote;
    }

    newData[postId].score += updateScore;

    return {
      ...state,
      data: newData
    }

    case 'UPDATE_DELETED_POST':
    var newData = Object.assign({}, state.data);
    var postId = action.payload;

    newData[postId].submittedByUserName = 'deleted';
    newData[postId].contentTitle = 'deleted';
    newData[postId].contentTag = '';
    newData[postId].contentLink = '';
    newData[postId].contentDescription = '';

    return {
      ...state,
      data: newData
    }

    default:
    return state;
  }
}

const userAccount = (state = {
  loggedIn: false,
  userId: '',
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
      userId: action.payload._id,
      userName: action.payload.userName,
      email: action.payload.email,
      submitted: action.payload.submitted,
      voteHistory: (typeof(action.payload.voteHistory) === 'undefined')? {} : action.payload.voteHistory,
      saved: action.payload.saved
    }

    case 'USERDATA_LOADFAILED':
    return {
      ...state,
      loggedIn: false,
      userId: '',
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
      userId: '',
      userName: 'Anon',
      email: '',
      submitted: [],
      voteHistory: {},
      saved: []
    }

    case 'UPDATE_VOTE':
    var newVoteHistory = Object.assign({}, state.voteHistory);
    var postId = action.payload.postId;
    var vote = action.payload.currentVote;
    if (postId in newVoteHistory) {
      if (vote === newVoteHistory[postId]) {
        newVoteHistory[postId] = 0;
      } else {
        newVoteHistory[postId] = vote;
      }
    } else {
      newVoteHistory[postId] = vote;
    }

    return {
      ...state,
      voteHistory: newVoteHistory
    }

    case 'UPDATE_USERPROFILE_SAVEDPOST':
    var postId = action.payload;

    var newSaved = [];
    if (state.saved.includes(postId)) {
      newSaved = state.saved.filter(item => {
        return item !== postId;
      })
    } else {
      newSaved = [...state.saved, postId]
    }
    
    return {
      ...state,
      saved: newSaved
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