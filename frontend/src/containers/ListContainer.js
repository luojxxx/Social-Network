import { connect } from 'react-redux';
import { showPostBox, newPost, vote, deletePost } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  voteHistory: state.userAccount.voteHistory,
  userId: state.userAccount.userId,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
