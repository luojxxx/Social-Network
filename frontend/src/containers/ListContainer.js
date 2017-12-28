import { connect } from 'react-redux';
import { showPostBox, newPost, vote, deletePost, savePost } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  userId: state.userAccount.userId,
  voteHistory: state.userAccount.voteHistory,
  saved: state.userAccount.saved,
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  showPostBox: (parentId) => {
    dispatch(showPostBox(parentId));
  },
  newPost: (data) => {
    dispatch(newPost(data));
  },
  vote: (postId, priorVote, currentVote) => {
    dispatch(vote(postId, priorVote, currentVote));
  },
  deletePost: (postId) => {
    dispatch(deletePost(postId));
  },
  savePost: (postId) => {
    dispatch(savePost(postId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
