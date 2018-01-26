import { connect } from 'react-redux'
import { updateBanner } from '../actions/generalActions'
import { logout } from '../actions/pageActions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  subheading: state.displayState.subheading,
  bannerMsg: state.displayState.bannerMsg
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateBanner: (message) => {
    dispatch(updateBanner(message))
  },
  logout: () => {
    dispatch(logout())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
