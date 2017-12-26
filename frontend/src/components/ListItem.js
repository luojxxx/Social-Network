import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PostBox from './PostBox.js'

class ListItem extends Component{
  showPostBox = (e) => {
    this.props.showPostBox(this.props.data._id)
  }

  render() {
    var post = this.props.data;
    // console.log(this.props)
    return (
      <div className="content-block w-container">
        <div className="content-block-inner w-row">
          <div className="score-block w-col w-col-1">
            <h3>{post.score}</h3>
          </div>
          <div className="vote-block w-col w-col-1">
            <div><a href="#" className="button-2 fontawesome w-button">&#xf062;</a></div>
            <div><a href="#" className="button-3 fontawesome w-button">&#xf063;</a></div>
          </div>
          <div className="content-title-options w-col w-col-10">
            <div>
              <h4>{post.contentTitle}</h4>
              <div>{post.submittedByUserName} - {post.dateSubmitted}  {post.contentTag}</div>
            </div>
            <div>
              <a onClick={this.showPostBox} href="#" className="w-button">Reply</a>
              <a href="#" className="w-button">Share</a>
              <a href="#" className="w-button">Save</a>
              <a href="#" className="w-button">Report</a>
            </div>
          </div>
        </div>
        {(this.props.showPostBoxId === post._id) ? 
        <PostBox newPost={this.props.newPost} parent={post._id} /> : <span/>}
      </div>
      )}
}


// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default ListItem



