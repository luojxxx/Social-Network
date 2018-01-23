import { connect } from 'react-redux'
import { changeUserName, setSubHeading } from '../actions'
import Settings from '../components/Settings'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setSubHeading: (subheading) => {
    dispatch(setSubHeading(subheading))
  },
  changeUserName: (userId, userName) => {
    dispatch(changeUserName(userId, userName))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)