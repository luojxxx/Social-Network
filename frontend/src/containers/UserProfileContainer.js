import { connect } from 'react-redux'
import { loadUserProfile, loadUserHistoryByField } from '../actions/pageActions'
import UserProfile from '../components/UserProfile'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading,
  userAccount: state.userAccount,
  userProfile: state.userProfile
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserProfile: (userId, page) => {
    dispatch(loadUserProfile(userId, page))
  },
  loadUserHistoryByField: (userId, field, page) => {
    dispatch(loadUserHistoryByField(userId, field, page))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile)