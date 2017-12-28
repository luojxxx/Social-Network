import { connect } from 'react-redux';
import { loadFrontPageData, newPost } from '../actions';
import Header from '../components/Header';

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
)(Header);
