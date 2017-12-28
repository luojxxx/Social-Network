import { connect } from 'react-redux';
import { loadFrontPageData, newPost } from '../actions';
import UserProfile from '../components/UserProfile';

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newPost: (data) => {
    dispatch(newPost(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);