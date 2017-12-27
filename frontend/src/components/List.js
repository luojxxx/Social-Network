import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

class List extends Component{
  render() {
    var props = this.props;
    return (
      <div>
        {props.displayedPostsOrder.map((postId, idx) => {
          var item = props.displayedPostsData[postId];
          var voteState = 0;
          if (typeof(props.voteHistory[postId]) !== 'undefined') {
            voteState = props.voteHistory[postId];
          }
          return <ListItem 
            key={postId}
            data={item}
            voteState={voteState}
            showPostBox={props.showPostBox}
            showPostBoxId={props.showPostBoxId}
            newPost={props.newPost}
            vote={props.vote} />
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