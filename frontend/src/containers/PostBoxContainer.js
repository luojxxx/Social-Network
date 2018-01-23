import { connect } from 'react-redux'
import { newPost, editPost } from '../actions'
import PostBox from '../components/PostBox'

const mapStateToProps = (state, ownProps) => ({
  pendingPostState: state.displayState.pendingPostState
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  newPost: (data) => {
    dispatch(newPost(data))
  },
  editPost: (postId, data) => {
    dispatch(editPost(postId, data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostBox)
