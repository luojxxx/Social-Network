import { connect } from 'react-redux'
import { logout } from '../actions/pageActions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  subheading: state.displayState.subheading,
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
