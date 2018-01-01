import { connect } from 'react-redux'
import { changeUserName } from '../actions'
import Settings from '../components/Settings'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeUserName: (userId, userName) => {
    dispatch(changeUserName(userId, userName))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)