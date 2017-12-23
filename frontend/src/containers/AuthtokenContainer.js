import { connect } from 'react-redux';
import { updateField, addTodo, removeTodo } from '../actions';
import Authtoken from '../components/Authtoken';

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  clickLogin: () => {
    // dispatch(updateField(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authtoken);