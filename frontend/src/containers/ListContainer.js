import { connect } from 'react-redux';
import { loadFrontPageData, showPostBox, newPost } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  frontPageList: state.frontPage.frontPageList,
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFrontPageData: () => {
    dispatch(loadFrontPageData());
  },
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
