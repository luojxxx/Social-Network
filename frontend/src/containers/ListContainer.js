import { connect } from 'react-redux';
import { showPostBox, newPost, vote } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data,
  displayedPostsOrder: state.displayedPosts.dataOrder,
  voteHistory: state.userAccount.voteHistory,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
