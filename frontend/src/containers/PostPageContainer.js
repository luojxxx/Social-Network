import { connect } from 'react-redux'
import { loadPost } from '../actions'
import PostPage from '../components/PostPage'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPost: (postId) => {
    dispatch(loadPost(postId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)