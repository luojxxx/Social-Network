import { connect } from 'react-redux';
import { newPost } from '../actions';
import PostBox from '../components/PostBox';

const mapStateToProps = (state, ownProps) => ({
  // userAccount: state.userAccount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  newPost: (data) => {
    dispatch(newPost(data));
  }
  // logout: () => {
  //   dispatch(logout());
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostBox);
