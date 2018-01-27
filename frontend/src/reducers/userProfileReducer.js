export const userProfile = (state = {
  userName: 'Guest',
  totalPosts: 0,
  totalVotes: 0
}, action) => {
  switch (action.type) {

    case 'USER_PROFILE_LOADED':
    return {
      ...state,
      userName: action.payload.userName,
      totalPosts: action.payload.totalPosts,
      totalVotes: action.payload.totalVotes
    }

    default:
    return state
  }
}