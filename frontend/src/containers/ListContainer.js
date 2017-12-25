import { connect } from 'react-redux';
import { loadData, updateField, addTodo, removeTodo } from '../actions';
import List from '../components/List';

const mapStateToProps = (state, ownProps) => ({
  frontPageList: state.frontPage.frontPageList
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadData: () => {
    dispatch(loadData());
  },
  updateField: (text) => {
    dispatch(updateField(text));
  },
  addTodo: () => {
    dispatch(addTodo())
  },
  removeTodo: (idx) => {
    dispatch(removeTodo(idx))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
