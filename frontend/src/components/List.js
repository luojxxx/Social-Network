import React, {Component} from 'react'
import ListItem from './ListItem'
import SortingDropDown from './SortingDropDown'

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
      deletePost={props.deletePost} 
      savePost={props.savePost} 
      reportPost={props.reportPost} 
      vote={props.vote} />
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
    if (this.props.displayedPostsOrder.length === 0) {
      return <div>No results</div>
    }
    
    return (
      <div>
      <SortingDropDown sortPosts={this.props.sortPosts} />
      {this.recursiveComponent(
        this.props.displayedPostsData, 
        this.props.displayedPostsOrder, 
        0)}
      </div>
      )}
}

export default List