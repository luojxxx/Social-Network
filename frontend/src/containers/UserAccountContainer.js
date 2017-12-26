import { connect } from 'react-redux';
import { loadUserData, logout, showPostBox} from '../actions';
import UserAccount from '../components/UserAccount';

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount,
  showPostBoxId: state.displayState.showPostBoxId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserData: () => {
    dispatch(loadUserData());
  },
  logout: () => {
    dispatch(logout());
  },
  showPostBox: (parentId) => {
    dispatch(showPostBox(parentId))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
