import {routerReducer} from 'react-router-redux'
import {displayedPosts} from './displayedPostsReducer'
import {userAccount} from './userAccountReducer'
import {userProfile} from './userProfileReducer'
import {displayState} from './displayStateReducer'
import {notifications} from './notificationsReducer'

const routing = routerReducer

const reducers = {
  routing,
  displayedPosts,
  userAccount,
  userProfile,
  displayState,
  notifications
}

export default reducers