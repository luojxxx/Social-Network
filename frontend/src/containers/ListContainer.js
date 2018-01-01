import { connect } from 'react-redux'
import { loadFrontPageData, loadPost, showPostBox, 
  newPost, vote, deletePost, savePost, reportPost,
   showReportConfirmation, showPostDescription, sortPosts } from '../actions'
import List from '../components/List'

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  userId: state.userAccount.userId,
  voteHistory: state.userAccount.voteHistory,
  saved: state.userAccount.saved,
  showPostBoxId: state.displayState.showPostBoxId,
  showPostDescriptionIds: state.displayState.showPostDescriptionIds,
  reportConfirmationId: state.displayState.reportConfirmationId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  showPostBox: (parentId) => {
    dispatch(showPostBox(parentId))
  },
  newPost: (data) => {
    dispatch(newPost(data))
  },
  vote: (postId, priorVote, currentVote) => {
    dispatch(vote(postId, priorVote, currentVote))
  },
  showPostDescription: (postId) => {
    dispatch(showPostDescription(postId))
  },
  deletePost: (postId) => {
    dispatch(deletePost(postId))
  },
  savePost: (postId) => {
    dispatch(savePost(postId))
  },
  showReportConfirmation: (postId) => {
    dispatch(showReportConfirmation(postId))
  },
  reportPost: (postId) => {
    dispatch(reportPost(postId))
  },
  loadFrontPageData: () => {
    dispatch(loadFrontPageData())
  },
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
)(List)