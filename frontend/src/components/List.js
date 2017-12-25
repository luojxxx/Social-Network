import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

class List extends Component{
  componentDidMount(){
    this.props.loadFrontPageData();
  }

  render() {
    var props = this.props;
    return (
      <div>
        {props.frontPageList.map((item, idx)=>{
          return <ListItem 
            key={item._id}
            data={item} />
        })}
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

export default List