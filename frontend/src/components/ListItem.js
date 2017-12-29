import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PostBox from './PostBox.js'

class ListItem extends Component{
  showPostBox = (e) => {
    this.props.showPostBox(this.props.data._id);
  }

  upVote = (e) => {
    this.props.vote(this.props.data._id, this.props.voteState, 1);
  }

  downVote = (e) => {
    this.props.vote(this.props.data._id, this.props.voteState, -1);
  }

  deletePost = (e) => {
    this.props.deletePost(this.props.data._id);
  }

  savePost = (e) => {
    this.props.savePost(this.props.data._id);
  }

  showReportConfirmation = (e) => {
    this.props.showReportConfirmation(this.props.data._id);
  }

  reportPost = (e) => {
    this.props.reportPost(this.props.data._id);
  }

  render() {
    var post = this.props.data;
    var scoreColor = {};
    if (this.props.voteState === 1) {
      scoreColor['color'] = 'orange';
    } else if (this.props.voteState === -1) {
      scoreColor['color'] = 'blue';
    }

    return (
      <div className="content-block w-container">
        <div className="content-block-inner w-row">
          <div className="score-block w-col w-col-1">
            <h3
            style={scoreColor}>
            {post.score}</h3>
          </div>
          <div className="vote-block w-col w-col-1">
            <div>
              <a 
              onClick={this.upVote}
              style={(this.props.voteState===1)?{color:'orange'}:{}}
              href="#" 
              className="button-2 fontawesome w-button">&#xf062;</a>
            </div>
            <div>
              <a 
              onClick={this.downVote}
              style={(this.props.voteState===-1)?{color:'blue'}:{}}
              href="#" 
              className="button-3 fontawesome w-button">&#xf063;</a>
            </div>
          </div>
          <div className="content-title-options w-col w-col-10">
            <div>
              <h4>{post.contentTitle}</h4>
              <a href={post.contentLink}>{post.contentLink}</a>
              <div>{post.contentDescription}</div>
              <div>{post.submittedByUserName} - {post.dateSubmitted}  {post.contentTag}</div>
            </div>
            <div>
              <a 
              onClick={this.showPostBox} 
              style={(this.props.showPostBoxId===post._id)?{color:'blue'}:{}}
              href="#" 
              className="w-button">
              Reply</a>

              <a 
              href="#" 
              className="w-button">
              Share</a>

              <a 
              onClick={this.savePost}
              href="#" 
              className="w-button">
              {(this.props.savedState===true)?'Unsave':'Save'}</a>

              {(this.props.showReportConfirmationState===true)?
              <a 
              onClick={this.reportPost} 
              href="#" 
              className="w-button">
              Report Confirm?</a>:
              <a 
              onClick={this.showReportConfirmation} 
              href="#" 
              className="w-button">
              Report</a>}

              {(this.props.submittedByCurrentUser? 
                <a 
                onClick={this.deletePost} 
                href="#" 
                className="w-button">
                Delete
                </a>:'')}

            </div>
          </div>
        </div>
        {(this.props.showPostBoxId === post._id) ? 
        <PostBox newPost={this.props.newPost} parent={post._id} /> : ''}
      </div>
      )}
}


// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default ListItem