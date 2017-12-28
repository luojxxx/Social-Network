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

          var savedState = false;
          if (typeof(props.saved) !== 'undefined') {
            if (props.saved.includes(postId)) {
              savedState = true;
            }
          }

          var showReportConfirmationState = false;
          if (props.reportConfirmationId === postId) {
            showReportConfirmationState = true;
          }

          var submittedByCurrentUser = false;
          if (props.userId === item.submittedByUserId) {
            submittedByCurrentUser = true;
          }

          return <ListItem 
            key={postId} 
            data={item} 
            voteState={voteState} 
            savedState={savedState} 
            showReportConfirmationState={showReportConfirmationState} 
            submittedByCurrentUser={submittedByCurrentUser}
            showPostBoxId={props.showPostBoxId} 
            showPostBox={props.showPostBox} 
            newPost={props.newPost} 
            deletePost={props.deletePost} 
            savePost={props.savePost} 
            showReportConfirmation={props.showReportConfirmation} 
            reportPost={props.reportPost} 
            vote={props.vote} 
             />
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