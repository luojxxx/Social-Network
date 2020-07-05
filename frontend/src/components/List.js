import React, {Component} from 'react'
import ListItem from './ListItem'

const threadStyle = {
  margin: '3%',
  borderLeft: '2px dotted #313131',
  backgroundColor: 'rgba(247,199,68,0.2)',
  paddingBottom: '1.5%'
}

class List extends Component{
  listItem = (postId, depth) => {
    var props = this.props    
    var item = props.displayedPostsData[postId]

    var voteState = 0
    if (typeof(props.voteHistory[postId]) !== 'undefined') {
      voteState = props.voteHistory[postId]
    }

    var savedState = false
    if (typeof(props.saved) !== 'undefined') {
      if (props.saved.includes(postId)) {
        savedState = true
      }
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
      savedState={savedState} 
      submittedByCurrentUser={submittedByCurrentUser} 
      loggedIn={props.loggedIn} 
      deletePost={props.deletePost} 
      savePost={props.savePost} 
      reportPost={props.reportPost} 
      vote={props.vote} 
      updateBanner={props.updateBanner} />
  }

  recursiveComponent = (dataDic, listOfList, depth) => {
    return listOfList.map((ele, idx) => {
      var item = listOfList[idx]
      var postId = item.postId
      var children = item.children

      return (<div 
        key={'wrapper'+postId}
        style={threadStyle}>
        {this.listItem(postId, depth)} 
        {(children.length > 0)?this.recursiveComponent(dataDic, children, depth+1):''}
        </div>)
    })
  }

  render() {
    if (this.props.displayedPostsOrder.length === 0) {
      return <div className=''><h3>No results</h3></div>
    }
    
    return (
      <div>
      {this.recursiveComponent(
        this.props.displayedPostsData, 
        this.props.displayedPostsOrder, 
        0)}
      </div>
      )}
}

export default List