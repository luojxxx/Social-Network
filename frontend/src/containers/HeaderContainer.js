import { connect } from 'react-redux'
import { logout } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  showPostBoxId: state.displayState.showPostBoxId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => {
    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
