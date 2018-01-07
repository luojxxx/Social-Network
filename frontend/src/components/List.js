import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListItem from './ListItem'
import SortingDropDown from './SortingDropDown'
import SharePost from './SharePost'

class List extends Component{
  
  listItem = (postId, depth) => {
    var props = this.props    
    var item = props.displayedPostsData[postId]

    var voteState = 0
    if (typeof(props.voteHistory[postId]) !== 'undefined') {
      voteState = props.voteHistory[postId]
    }

    var showPostDescriptionState = false
    if (props.showPostDescriptionIds.includes(postId)) {
      showPostDescriptionState = true
    }

    var savedState = false
    if (typeof(props.saved) !== 'undefined') {
      if (props.saved.includes(postId)) {
        savedState = true
      }
    }

    var showReportConfirmationState = false
    if (props.reportConfirmationId === postId) {
      showReportConfirmationState = true
    }

    var submittedByCurrentUser = false
    if (props.userId === item.submittedByUserId) {
      submittedByCurrentUser = true
    }

    return <ListItem 
      key={postId} 
      post={item} 
      depth={depth}
      voteState={voteState} 
      showPostDescriptionState={showPostDescriptionState}
      savedState={savedState} 
      showReportConfirmationState={showReportConfirmationState} 
      submittedByCurrentUser={submittedByCurrentUser} 
      showPostDescription={props.showPostDescription}
      showPostBoxId={props.showPostBoxId} 
      showPostBox={props.showPostBox} 
      newPost={props.newPost} 
      deletePost={props.deletePost} 
      savePost={props.savePost} 
      showReportConfirmation={props.showReportConfirmation} 
      reportPost={props.reportPost} 
      vote={props.vote} 
      showSharePostPopup={props.showSharePostPopup} />
  }

  recursiveComponent = (dataDic, listOfList, depth) => {
    return listOfList.map((ele, idx) => {
      var item = listOfList[idx]
      var postId = item.postId
      var children = item.children

      return (<div 
        key={'wrapper'+postId}
        style={{
          margin: '10px',
          border: '1px dotted black',
          backgroundColor: (depth%2===1)? '#C2C3C5': '#D7D7D5'
        }}>
        {this.listItem(postId, depth)} 
        {(children.length > 0)?this.recursiveComponent(dataDic, children, depth+1):''}
        </div>)
    })
  }

  render() {
    return (
      <div>
      <SharePost postData={this.props.sharePost} closeSharePostPopup={this.props.closeSharePostPopup} />
      <SortingDropDown sortPosts={this.props.sortPosts} />
      {this.recursiveComponent(
        this.props.displayedPostsData, 
        this.props.displayedPostsOrder, 
        0)}
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default List