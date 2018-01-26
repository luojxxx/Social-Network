import { connect } from 'react-redux'
import { loadPost, sortPosts } from '../actions/pageActions'
import PostPage from '../components/PostPage'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPost: (postId) => {
    dispatch(loadPost(postId))
  },
  sortPosts: (sortBy, direction) => {
    dispatch(sortPosts(sortBy, direction))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPage)