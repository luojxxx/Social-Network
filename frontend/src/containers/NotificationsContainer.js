import { connect } from 'react-redux'
import { loadNotifications } from '../actions/pageActions'
import Notifications from '../components/Notifications'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading,
  notifications: state.notifications.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadNotifications: (page) => {
    dispatch(loadNotifications(page))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)