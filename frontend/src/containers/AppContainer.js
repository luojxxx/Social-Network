import { connect } from 'react-redux';
import { loadFrontPageData, newPost } from '../actions';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => ({
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFrontPageData: () => {
    dispatch(loadFrontPageData());
  },
  newPost: (data) => {
    dispatch(newPost(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
