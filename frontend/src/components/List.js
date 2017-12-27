import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

class List extends Component{
  render() {
    var props = this.props;
    return (
      <div>
        {props.displayedPosts.map((item, idx) => {
          return <ListItem 
            key={item._id}
            data={item}
            showPostBox={props.showPostBox}
            showPostBoxId={props.showPostBoxId}
            newPost={props.newPost} />
        })}
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default List