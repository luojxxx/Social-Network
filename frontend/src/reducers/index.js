import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {generateThreadedPosts, remove, postSorter} from '../libraryHelper'

const routing = routerReducer

// findAllParents(temp1, '5a49c111754f408d60e119c3')

const findAllParents = (dataDic, startId) => {
  var allParents = []
  while (dataDic[startId].parent in dataDic) {
    let parent = dataDic[startId].parent
    allParents.push(parent)
    startId = parent
  }
  allParents.reverse()
  return allParents
}

// const insertIntoNestedList = ()

const displayedPosts = (state = {
  pageData: [],
  data: {},
  dataOrder: [],
  sortBy: 'score',
  sortDirection: 'down'
}, action) => {
  switch (action.type) {
    case 'PAGE_LOADED':
    var pageData = action.payload
    var threadedPosts = generateThreadedPosts(pageData)
    var data = threadedPosts[0]
    for (let key in data) {
      data[key]['dateSubmitted'] = Date.parse(data[key]['dateSubmitted'])
    }
    var dataOrder = threadedPosts[1]
    postSorter(data, dataOrder, state.sortBy, state.sortDirection)
    return {
      ...state,
      pageData: pageData,
      data: data,
      dataOrder: dataOrder
    }

    case 'UPDATE_NEW_POST':
    var newPostData = action.payload


    console.log(state.pageData)
    var pageData = [newPostData, ...state.pageData]
    console.log(pageData)
    var threadedPosts = generateThreadedPosts(pageData)
    var data = threadedPosts[0]
    var dataOrder = threadedPosts[1]
    return {
      ...state,
      pageData: pageData,
      data: data,
      dataOrder: dataOrder
    }

    case 'UPDATE_NEW_VOTE':
    var newData = Object.assign({}, state.data)
    var postId = action.payload.postId
    var priorVote = action.payload.priorVote
    var currentVote = action.payload.currentVote

    var updateScore = 0
    if (currentVote === priorVote) {
      updateScore = (-1*priorVote)
    } else {
      updateScore = currentVote - priorVote
    }

    newData[postId].score += updateScore

    return {
      ...state,
      data: newData
    }

    case 'UPDATE_NEW_DELETED_POST':
    var newData = Object.assign({}, state.data)
    var postId = action.payload

    newData[postId].submittedByUserName = 'deleted'
    newData[postId].contentTitle = 'deleted'
    newData[postId].contentTag = ''
    newData[postId].contentLink = ''
    newData[postId].contentDescription = ''

    return {
      ...state,
      data: newData
    }

    case 'SORT_POSTS':
    var sortBy = action.payload.sortBy
    var sortDirection = action.payload.sortDirection
    var dataOrder = Object.assign([], state.dataOrder)
    postSorter(state.data, dataOrder, sortBy, sortDirection)
    return {
      ...state,
      dataOrder: dataOrder,
      sortBy: sortBy,
      sortDirection: sortDirection
    }

    default:
    return state
  }
}

const userAccount = (state = {
  loggedIn: false,
  userId: '',
  userName: 'Guest',
  email: '',
  submitted: [],
  voteHistory: {},
  saved: [],
  totalVotes: 0
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
      saved: action.payload.saved,
      totalVotes: action.payload.totalVotes
    }

    case 'USERDATA_LOADFAILED':
    return {
      ...state,
      loggedIn: false,
      userId: '',
      userName: 'Guest',
      email: '',
      submitted: [],
      voteHistory: {},
      saved: [],
      totalVotes: 0
    }

    case 'LOGOUT':
    localStorage.removeItem('token')
    return {
      ...state,
      loggedIn: false,
      userId: '',
      userName: 'Guest',
      email: '',
      submitted: [],
      voteHistory: {},
      saved: [],
      totalVotes: 0
    }

    case 'UPDATE_NEW_POST':
    return {
      ...state,
      submitted: [action.payload._id, ...state.submitted]
    }

    case 'UPDATE_NEW_VOTE':
    var newVoteHistory = Object.assign({}, state.voteHistory)
    var postId = action.payload.postId
    var vote = action.payload.currentVote
    if (postId in newVoteHistory) {
      if (vote === newVoteHistory[postId]) {
        newVoteHistory[postId] = 0
      } else {
        newVoteHistory[postId] = vote
      }
    } else {
      newVoteHistory[postId] = vote
    }

    return {
      ...state,
      voteHistory: newVoteHistory
    }

    case 'UPDATE_NEW_SAVED_POST':
    var postId = action.payload

    var newSaved = []
    if (state.saved.includes(postId)) {
      newSaved = state.saved.filter(item => {
        return item !== postId
      })
    } else {
      newSaved = [...state.saved, postId]
    }
    
    return {
      ...state,
      saved: newSaved
    }

    case 'UPDATE_USER_NAME':
    console.log('action me: payload')
    return {
      ...state,
      userName: action.payload
    }

    default:
    return state
  }
}

const userProfile = (state = {
  userName: 'Guest',
  submitted: [],
  totalVotes: 0
}, action) => {
  switch (action.type) {
    case 'USER_PROFILE_LOADED':
    return {
      ...state,
      userName: action.payload.userName,
      submitted: action.payload.submitted,
      totalVotes: action.payload.totalVotes
    }

    default:
    return state
  }
}

const displayState = (state = {
  showPostBoxId: '',
  reportConfirmationId: '',
  showPostDescriptionIds: []
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

    case 'SHOW_REPORT_CONFIRMATION':
    if (state.reportConfirmationId === action.payload) {
      return {
        ...state,
        reportConfirmationId: ''
      }
    } else {
      return {
        ...state,
        reportConfirmationId: action.payload
      }
    }

    case 'SHOW_POST_DESCRIPTION':
    var postId = action.payload
    var newShowPostDescriptionIds = []
    if (state.showPostDescriptionIds.includes(postId)) {
      newShowPostDescriptionIds = remove(state.showPostDescriptionIds, [postId])
    } else {
      newShowPostDescriptionIds = [...newShowPostDescriptionIds, postId]
    }
    return {
      ...state,
      showPostDescriptionIds: newShowPostDescriptionIds
    }

    default:
    return state
  }
}

const reducers = combineReducers({
  routing,
  displayedPosts,
  userAccount,
  userProfile,
  displayState
})

export default reducers