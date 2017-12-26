import { connect } from 'react-redux';
import { newPost } from '../actions';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => ({
  showPostBoxId: state.displayState.showPostBoxId
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
)(App);
