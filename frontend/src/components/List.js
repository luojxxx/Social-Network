import React, {Component} from 'react'
import PropTypes from 'prop-types'

class TodoList extends Component{
  componentDidMount(){
    this.props.loadData();
  }

  render() {
    var props = this.props;
    console.log(props)
    return (
      <div>
        <input type='text' value={props.fieldText} onChange={(e) => props.updateField(e.target.value)} />
        <button onClick={props.addTodo}> Add todo </button>
        <br />
        <ul>
        {props.pokemon.map((item, idx)=>{
          return <li key={idx} onClick={(e)=>{props.removeTodo(idx)}}>{item}</li>
        })}
        </ul>
      </div>
      )}
}

// const TodoList = (props) => {
//   return (
//     <div>
//       <input type='text' value={props.fieldText} onChange={(e) => props.updateField(e.target.value)} />
//       <button onClick={props.addTodo}> Add todo </button>
//       <br />
//       <ul>
//       {props.pokemon.map((item, idx)=>{
//         return <li key={idx} onClick={(e)=>{props.removeTodo(idx)}}>{item}</li>
//       })}
//       </ul>
//     </div>
// )}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default TodoList



