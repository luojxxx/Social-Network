import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ListItem extends Component{
  render() {
    var post = this.props.data;
    console.log(post)
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
              <a href="#" className="w-button">Reply</a>
              <a href="#" className="w-button">Share</a>
              <a href="#" className="w-button">Save</a>
              <a href="#" className="w-button">Report</a>
            </div>
          </div>
        </div>
      </div>
      )}
}


// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default ListItem



