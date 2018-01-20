import {routerReducer} from 'react-router-redux'
import {displayedPosts} from './displayedPosts'
import {userAccount} from './userAccount'
import {userProfile} from './userProfile'
import {displayState} from './displayState'
import {notifications} from './notifications'

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