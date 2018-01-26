import { connect } from 'react-redux'
import { setSubHeading } from '../actions/pageActions'
import { changeUserName } from '../actions/userActions'
import Settings from '../components/Settings'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSubHeading: (subheading) => {
    dispatch(setSubHeading(subheading))
  },
  changeUserName: (userName) => {
    dispatch(changeUserName(userName))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)