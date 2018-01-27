export const userAccount = (state = {
  loggedIn: false,
  userId: '',
  userName: 'Guest',
  email: '',
  submitted: [],
  voteHistory: {},
  saved: [],
  totalVotes: 0,
  newNotifications: false
}, action) => {
  switch (action.type) {

    case 'USERDATA_LOADED':
    var voteHistory = {}
    for (let idx in action.payload.upvotes) {
      let postId = action.payload.upvotes[idx]
      voteHistory[postId] = 1
    }
    for (let idx in action.payload.downvotes) {
      let postId = action.payload.downvotes[idx]
      voteHistory[postId] = -1
    }
    return {
      ...state,
      loggedIn: true,
      userId: action.payload._id,
      userName: action.payload.userName,
      email: action.payload.email,
      submitted: action.payload.submitted,
      voteHistory: voteHistory,
      saved: action.payload.saved,
      totalVotes: action.payload.totalVotes,
      newNotifications: action.payload.newNotifications
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
    return {
      ...state,
      userName: action.payload
    }

    case 'LOADED_NOTIFICATIONS':
    return {
      ...state,
      newNotifications: false
    }

    default:
    return state
  }
}