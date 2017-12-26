import { connect } from 'react-redux';
// import { loadUserData, logout} from '../actions';
import NewPost from '../components/NewPost';

const mapStateToProps = (state, ownProps) => ({
  // userAccount: state.userAccount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // loadUserData: () => {
  //   dispatch(loadUserData());
  // },
  // logout: () => {
  //   dispatch(logout());
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
