import { connect } from 'react-redux'
import {
  vote, 
  deletePost, 
  savePost, 
  reportPost} from '../actions/postActions'
import { updateBanner } from '../actions/generalActions'
import List from '../components/List'

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  loggedIn: state.userAccount.loggedIn,
  userId: state.userAccount.userId,
  voteHistory: state.userAccount.voteHistory,
  saved: state.userAccount.saved
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
  },
  updateBanner: (message) => {
    dispatch(updateBanner(message))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)