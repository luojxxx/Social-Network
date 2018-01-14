import { connect } from 'react-redux'
import { newPost, logout, showPostBox } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  showPostBoxId: state.displayState.showPostBoxId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  newPost: (data) => {
    dispatch(newPost(data))
  },
  logout: () => {
    dispatch(logout())
  },
  showPostBox: (parentId) => {
    dispatch(showPostBox(parentId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
