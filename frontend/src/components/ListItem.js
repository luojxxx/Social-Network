import React, {Component} from 'react'
import {Link} from 'react-router'
import ReactMarkdown from 'react-markdown'

import {convertToTimePassed} from '../libraryHelper'
import PostBox from '../containers/PostBoxContainer'
import ContentPreview from './ContentPreview'
import LinkThumbnail from './LinkThumbnail'
import LinkContent from './LinkContent'
import SharePost from './SharePost'

const highlighted = {color:'#F67D29'}
const muted = {color:'#607184'}

class ListItem extends Component{
  constructor(props){
    super(props)
    this.state={
      showPreview: false,
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
    if (this.props.loggedIn === false) {
      this.props.updateBanner('Please login to vote')
      return
    }
    this.props.vote(this.props.post._id, this.props.voteState, 1)
  }

  downVote = (e) => {
    e.preventDefault()
    if (this.props.loggedIn === false) {
      this.props.updateBanner('Please login to vote')
      return
    }
    this.props.vote(this.props.post._id, this.props.voteState, -1)
  }

  toggleContentPreview = () => {
    console.log(this.state.showPreview)
    if (this.state.showPreview === false) {
      this.setState({showPreview: true})
    } else {
      this.setState({showPreview: false})
    }
  }

  toggleReplyForm = () => {
    if (this.props.loggedIn === false) {
      this.props.updateBanner('Please login to reply')
      return
    }
    if (this.state.showReplyForm === false) {
      this.setState({showReplyForm: true, showEditForm: false})
    } else {
      this.setState({showReplyForm: false, showEditForm: false})
    }
  }

  togglePostDescription = (e) => {
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

  closeSharePostPopup = () => {
    this.setState({showSharePostPopup: false})
  }

  savePost = (e) => {
    e.preventDefault()
    if (this.props.loggedIn === false) {
      this.props.updateBanner('Please login to save post')
      return
    }
    this.props.savePost(this.props.post._id)
  }

  showReportConfirmation = (e) => {
    e.preventDefault()
    if (this.props.loggedIn === false) {
      this.props.updateBanner('Please login to report post')
      return
    }
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
      scoreColor = highlighted
    }
    if (this.props.voteState === -1) {
      scoreColor = muted
    }

    return (
      <div className="content-block">
        <div className="listItemRow">
          <div 
            // style={{width:String(5*this.props.depth)+'%'}} 
            style={{width: '1%'}}
            className="">
          </div>

          <div className="listItemMargin">
            <div>
              <button 
                onClick={this.upVote}
                style={(this.props.voteState===1)?highlighted:{}}
                className="fontawesome">
                &#xf062;
              </button>
            </div>
            <div>
              <button 
                onClick={this.downVote}
                style={(this.props.voteState===-1)?muted:{}}
                className="fontawesome">
                &#xf063;
              </button>
            </div>
          </div>

          <div onClick={this.toggleContentPreview}>
            <LinkThumbnail url={post.contentLink} />
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
                ?<button onClick={this.togglePostDescription} className='greyedOut'>
                  {this.state.showPostDescription?'[+collapse]':'[+expand]'}
                </button>
                :''
              }
              {' '}
              <span style={{color:'red'}}>{post.contentTag}</span>
              <br />

              <a href={post.contentLink}>{post.contentLink}</a>
              {this.state.showPreview
                ?<LinkContent url={post.contentLink} />
                :''}
              {(this.state.showPostDescription)
                ?<div className='contentDescriptionBox'>
                  <ReactMarkdown source={post.contentDescription} />
                  </div>
                :''
              }
              <div>
                <span style={scoreColor}>{post.score} </span>
                 points by{' '}
                {(post.submittedByUserId != null)
                  ?<Link to={'/userprofile/'+post.submittedByUserId+'/submitted'}>{post.submittedByUserName}</Link>
                  :post.submittedByUserName 
                }
                {' '}{convertToTimePassed(post.dateSubmitted)}{' ago'}
              </div>
            </div>

            <div className="listItemActionBar">
              <button 
                onClick={this.toggleReplyForm} 
                style={(this.state.showReplyForm)?highlighted:{}}
                className="listItemActionBarItem">
                  Reply
              </button>
              {(this.state.showSharePostPopup)
                ?<SharePost postData={post} closeSharePostPopup={this.closeSharePostPopup} />
                :<button 
                    onClick={this.showSharePostPopup}
                    className='listItemActionBarItem'>
                    Share
                  </button>
              }
              <button onClick={this.savePost} className="listItemActionBarItem">
                {(this.props.savedState)
                  ?'Unsave'
                  :'Save'
                }
              </button>
              {(this.state.showReportConfirmation)
                ?<span>
                  <button onClick={this.reportPost} className="listItemActionBarItem">
                    Report Confirm?
                  </button>
                  <button onClick={this.closeReportConfirmation} className="listItemActionBarItem">
                    X
                  </button>
                  </span>
                :<button onClick={this.showReportConfirmation} className="listItemActionBarItem">
                    Report
                  </button>
              }
              {(this.props.submittedByCurrentUser)
                ?<button 
                  onClick={this.toggleEditForm}
                  style={(this.state.showEditForm)?highlighted:{}}
                  className='listItemActionBarItem'>
                    Edit
                  </button>
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
                  <button onClick={this.deletePost} className="listItemActionBarItem">
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