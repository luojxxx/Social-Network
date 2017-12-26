import { connect } from 'react-redux';
import { loadUserData, logout} from '../actions';
import UserAccount from '../components/UserAccount';

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserData: () => {
    dispatch(loadUserData());
  },
  logout: () => {
    dispatch(logout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
