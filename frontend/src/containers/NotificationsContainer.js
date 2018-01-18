import { connect } from 'react-redux'
import { loadNotifications } from '../actions'
import Notifications from '../components/Notifications'

const mapStateToProps = (state, ownProps) => ({
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