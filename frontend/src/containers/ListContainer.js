import { connect } from 'react-redux';
import { showPostBox, newPost } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  displayedPosts: state.displayedPosts.data,
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  showPostBox: (parentId) => {
    dispatch(showPostBox(parentId));
  },
  newPost: (data) => {
    dispatch(newPost(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
