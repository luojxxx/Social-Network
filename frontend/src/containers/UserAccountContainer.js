import { connect } from 'react-redux';
// import { loadData, updateField, addTodo, removeTodo } from '../actions';
import UserAccount from '../components/UserAccount';

const mapStateToProps = (state, ownProps) => ({
  userAccount: state.userAccount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // loadData: () => {
  //   dispatch(loadData());
  // },
  // updateField: (text) => {
  //   dispatch(updateField(text));
  // },
  // addTodo: () => {
  //   dispatch(addTodo())
  // },
  // removeTodo: (idx) => {
  //   dispatch(removeTodo(idx))
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
