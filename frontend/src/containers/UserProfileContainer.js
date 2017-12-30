import { connect } from 'react-redux'
import { loadUserProfile, loadUserHistoryByField, newPost } from '../actions'
import UserProfile from '../components/UserProfile'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  userProfile: state.userProfile,
  showPostBoxId: state.displayState.showPostBoxId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: (userId) => {
    dispatch(loadUserProfile(userId))
  },
  loadUserHistoryByField: (userId, field) => {
    dispatch(loadUserHistoryByField(userId, field))
  },
  newPost: (data) => {
    dispatch(newPost(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)