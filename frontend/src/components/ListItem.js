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

  toggleReplyForm = () => {
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

  toggleEditForm = () => {
    if (this.state.showEditForm === false) {
      this.setState({showEditForm: true, showReplyForm: false})
    } else {
      this.setState({showEditForm: false, showReplyForm: false})
    }
  }

  closePostBox = () => {
    this.setState({showReplyForm: false, showEditForm: false})
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
      scoreColor['color'] = '#F67D29'
    } else if (this.props.voteState === -1) {
      scoreColor['color'] = '#607184'
    }

    return (
      <div className="content-block">
        <div className="listItemRow">
          <div 
            style={{width:String(5*this.props.depth)+'%'}} 
            className="">
          </div>

          <div className="listItemMargin">
            <h3 style={scoreColor}>{post.score}</h3>
          </div>

          <div className="listItemMargin">
            <div>
              <button 
                onClick={this.upVote}
                style={(this.props.voteState===1)?{color:'#F67D29'}:{}}
                className="button-2 fontawesome">
                &#xf062;
              </button>
            </div>
            <div>
              <button 
                onClick={this.downVote}
                style={(this.props.voteState===-1)?{color:'#607184'}:{}}
                className="button-3 fontawesome">
                &#xf063;
              </button>
            </div>
          </div>

          <div className="listItemCol">
            <div>
              {(post.parent != null)
                ?<Link 
                  to={'/post/'+post.parent}
                  className="fontawesome">&#xf112;</Link>
                :''
              }
              {' '}
              <Link to={'/post/'+post._id}>{post.contentTitle}</Link>
              {' '}
              {(post.contentDescription!=='')
                ?<button onClick={this.postDescriptionToggle}>(...)</button>
                :''
              }
              {' '}
              <span style={{color:'red'}}>{post.contentTag}</span>
              <br />

              <a href={post.contentLink}>{post.contentLink}</a>
              <ContentPreview url={post.contentLink} />
              {(this.state.showPostDescription)
                ?<div className='contentDescriptionBox'>{post.contentDescription}</div>
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
                style={(this.state.showReplyForm)?{color:'#F67D29'}:{}}
                className="">
                Reply
              </button>
              {(this.state.showSharePostPopup)
                ?<SharePost postData={post} closeSharePostPopup={this.closeSharePostPopup} />
                :<button onClick={this.showSharePostPopup}>Share</button>
              }
              <button onClick={this.savePost} className="">
                {(this.props.savedState)
                  ?'Unsave'
                  :'Save'
                }
              </button>
              {(this.state.showReportConfirmation)
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
                  style={(this.state.showEditForm)?{color:'#F67D29'}:{}}>Edit</button>
                :''
              }
              {(this.props.submittedByCurrentUser && this.state.showDeleteConfirmation===false
                ?<button onClick={this.showDeleteConfirmation} className="">
                  Delete
                  </button>
                :'')
              }
              {(this.state.showDeleteConfirmation)
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
        {(this.state.showReplyForm) 
          ?<PostBox 
            parent={post._id} 
            post={{
              contentTitle: '',
              contentTag: '',
              contentLink: '',
              contentDescription: ''
            }}
            newOrEdit='new' 
            closePostBox={this.closePostBox} /> 
          : ''}
        {(this.state.showEditForm) 
          ?<PostBox 
            parent={post._id} 
            post={post} 
            newOrEdit='edit' 
            closePostBox={this.closePostBox} /> 
          : ''}
      </div>
      )
  }
}

export default ListItem