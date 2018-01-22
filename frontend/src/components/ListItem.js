import React, {Component} from 'react'
import {Link} from 'react-router'

import {convertToTimePassed} from '../libraryHelper'
import PostBox from '../containers/PostBoxContainer'
import ContentPreview from './ContentPreview'
import SharePost from './SharePost'

class ListItem extends Component{
  constructor(props){
    super(props)
    this.state={
      showReplyForm: false,
      showPostDescription: false,
      showSharePostPopup: false,
      showReportConfirmation: false,
      showEditForm: false,
      showDeleteConfirmation: false,
    }
  }

  showPostBox = (e) => {
    e.preventDefault()
    this.props.showPostBox(this.props.post._id)
  }

  upVote = (e) => {
    e.preventDefault()
    this.props.vote(this.props.post._id, this.props.voteState, 1)
  }

  downVote = (e) => {
    e.preventDefault()
    this.props.vote(this.props.post._id, this.props.voteState, -1)
  }

  toggleReplyForm = (e) => {
    e.preventDefault()
    if (this.state.showReplyForm === false) {
      this.setState({showReplyForm: true, showEditForm: false})
    } else {
      this.setState({showReplyForm: false, showEditForm: false})
    }
  }

  postDescriptionToggle = (e) => {
    e.preventDefault()
    if (this.state.showPostDescription === false) {
      this.setState({showPostDescription: true})
    } else {
      this.setState({showPostDescription: false})
    }
  }

  showSharePostPopup = (e) => {
    e.preventDefault()
    this.setState({showSharePostPopup: true})
  }

  closeSharePostPopup = (e) => {
    e.preventDefault()
    this.setState({showSharePostPopup: false})
  }

  savePost = (e) => {
    e.preventDefault()
    this.props.savePost(this.props.post._id)
  }

  showReportConfirmation = (e) => {
    e.preventDefault()
    this.setState({showReportConfirmation: true})
  }

  closeReportConfirmation = (e) => {
    e.preventDefault()
    this.setState({showReportConfirmation: false})
  }

  reportPost = (e) => {
    e.preventDefault()
    this.props.reportPost(this.props.post._id)
    this.setState({showReportConfirmation: false})
  }

  toggleEditForm = (e) => {
    e.preventDefault()
    if (this.state.showEditForm === false) {
      this.setState({showEditForm: true, showReplyForm: false})
    } else {
      this.setState({showEditForm: false, showReplyForm: false})
    }
  }

  showDeleteConfirmation = (e) => {
    e.preventDefault()
    this.setState({showDeleteConfirmation: true})
  }

  closeDeleteConfirmation = (e) => {
    e.preventDefault()
    this.setState({showDeleteConfirmation: false})
  }

  deletePost = (e) => {
    e.preventDefault()
    this.props.deletePost(this.props.post._id)
    this.setState({showDeleteConfirmation: false})
  }

  render() {
    var post = this.props.post
    var scoreColor = {}
    if (this.props.voteState === 1) {
      scoreColor['color'] = 'orange'
    } else if (this.props.voteState === -1) {
      scoreColor['color'] = 'blue'
    }

    return (
      <div className="content-block w-container">
        <div className="content-block-inner w-row">
          <div 
            style={{width:75*this.props.depth}} 
            className="score-block w-col w-col-1">
          </div>
          <div className="score-block w-col w-col-1">
            <h3 style={scoreColor}>{post.score}</h3>
          </div>
          <div className="vote-block w-col w-col-1">
            <div>
              <button 
                onClick={this.upVote}
                style={(this.props.voteState===1)?{color:'orange'}:{}}
                className="button-2 fontawesome">
                &#xf062;
              </button>
            </div>
            <div>
              <button 
                onClick={this.downVote}
                style={(this.props.voteState===-1)?{color:'blue'}:{}}
                className="button-3 fontawesome">
                &#xf063;
              </button>
            </div>
          </div>

          <div className="content-title-options w-col w-col-10">
            <div>
              {(post.parent != null)
                ?<Link 
                  to={'/post/'+post.parent}
                  className="button-3 fontawesome">&#xf112;</Link>
                :''
              }
              {' '}
              <Link to={'/post/'+post._id}>{post.contentTitle}</Link>
              {' '}
              <span style={{color:'red'}}>{post.contentTag}</span>
              <br />
              <a href={post.contentLink}>{post.contentLink}</a>
              <ContentPreview url={post.contentLink} />
              {(post.contentDescription!=='')
                ?<button onClick={this.postDescriptionToggle}>Show more</button>
                :''
              }
              {(this.state.showPostDescription)
                ?<div>{post.contentDescription}</div>
                :''
              }
              <div>
                Posted by{' '}
                {(post.submittedByUserId != null)
                  ?<Link to={'/userprofile/'+post.submittedByUserId+'/submitted'}>{post.submittedByUserName}</Link>
                  :post.submittedByUserName 
                }
                {' '}{convertToTimePassed(post.dateSubmitted)}{' ago'}
              </div>
            </div>

            <div>
              <button 
                onClick={this.toggleReplyForm} 
                style={(this.state.showReplyForm)?{color:'blue'}:{}}
                className="">
                Reply
              </button>
              {(this.state.showSharePostPopup)
                ?<SharePost postData={post} closeSharePostPopup={this.closeSharePostPopup} />
                :<button onClick={this.showSharePostPopup}>Share</button>
              }
              <button onClick={this.savePost} className="">
                {(this.props.savedState===true)
                  ?'Unsave'
                  :'Save'
                }
              </button>
              {(this.state.showReportConfirmation===true)
                ?<span>
                  <button onClick={this.reportPost} className="">
                    Report Confirm?
                  </button>
                  <button onClick={this.closeReportConfirmation} className="">
                    X
                  </button>
                  </span>
                :<button onClick={this.showReportConfirmation} className="">
                    Report
                  </button>
              }
              {(this.props.submittedByCurrentUser)
                ?<button 
                  onClick={this.toggleEditForm}
                  style={(this.state.showEditForm)?{color:'blue'}:{}}>Edit</button>
                :''
              }
              {(this.props.submittedByCurrentUser && this.state.showDeleteConfirmation===false
                ?<button onClick={this.showDeleteConfirmation} className="">
                  Delete
                  </button>
                :'')
              }
              {(this.state.showDeleteConfirmation === true)
                ?<span>
                  <button onClick={this.deletePost} className="">
                    Delete Confirm?
                  </button>
                  <button onClick={this.closeDeleteConfirmation} className="">
                    X
                  </button>
                  </span>
                :''
              }
            </div>
          </div>
        </div>
        {(this.state.showReplyForm===true) 
          ?<PostBox 
            newPost={this.props.newPost} 
            parent={post._id} 
            post={{
              contentTitle: '',
              contentTag: '',
              contentLink: '',
              contentDescription: ''
            }}
            newOrEdit='new' /> 
          : ''}
        {(this.state.showEditForm===true) 
          ?<PostBox 
            newPost={this.props.newPost} 
            parent={post._id} 
            post={post} 
            newOrEdit='edit' /> 
          : ''}
      </div>
      )
  }
}

export default ListItem