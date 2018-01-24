import { connect } from 'react-redux'
import {
  vote, 
  deletePost, 
  savePost, 
  reportPost} from '../actions'
import List from '../components/List'

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  userId: state.userAccount.userId,
  voteHistory: state.userAccount.voteHistory,
  saved: state.userAccount.save
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  vote: (postId, priorVote, currentVote) => {
    dispatch(vote(postId, priorVote, currentVote))
  },
  deletePost: (postId) => {
    dispatch(deletePost(postId))
  },
  savePost: (postId) => {
    dispatch(savePost(postId))
  },
  reportPost: (postId) => {
    dispatch(reportPost(postId))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)