import React, { Component } from 'react'
import {Link} from 'react-router'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import PostBox from '../components/PostBox'

class UserProfile extends Component {
  componentWillMount() {
    this.props.loadUserProfile(this.props.params.userId)
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.params.userId !== nextProps.params.userId) {
        this.props.loadUserProfile(nextProps.params.userId)
      }
    }

  loadSubmittedPosts = (e) => {
    var userAccount = this.props.userAccount
    this.props.loadUserProfile(this.props.params.userId)
  }

  loadUpvotedPosts = (e) => {
    var userAccount = this.props.userAccount
    this.props.loadUserHistoryByField(userAccount.userId, 'upvoted')
  }

  loadDownvotedPosts = (e) => {
    var userAccount = this.props.userAccount
    this.props.loadUserHistoryByField(userAccount.userId, 'downvoted')
  }

  loadSavedPosts = (e) => {
    var userAccount = this.props.userAccount
    this.props.loadUserHistoryByField(userAccount.userId, 'saved')
  }

  render() {
    var userAccount = this.props.userAccount
    var userProfile = this.props.userProfile
    var userProfileId = this.props.params.userId

    if (userProfileId === userAccount.userId) {
      return (
        <div>
          <Header subheader='User Profile' /> <br/>
          {this.props.showPostBoxId==='frontPage'? 
          <PostBox newPost={this.props.newPost} parent='' /> : ''}
          <div className="w-container">
            <div className="userprofilemetrics w-row">
              <div className="w-col w-col-4">
                <h1>{userAccount.userName}</h1>
                <div onClick={this.loadSubmittedPosts}>Submitted Posts</div>
                <div onClick={this.loadUpvotedPosts}>Upvoted posts</div>
                <div onClick={this.loadDownvotedPosts}>Downvoted Posts</div>
                <div onClick={this.loadSavedPosts}>Saved Posts</div>
                <div><Link to='/settings'>Settings</Link></div>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Posts</h1>
                <h1>{userAccount.submitted.length}</h1>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Votes</h1>
                <h1>{userAccount.totalVotes}</h1>
              </div>
            </div>
          </div>
          <List />
        </div>
      )
    } else {
      userAccount = userProfile
      return (
        <div>
          <Header /> <br/>
          {(this.props.showPostBoxId==='frontPage') 
          ?<PostBox newPost={this.props.newPost} parent='' /> 
          : ''}
          <div className="w-container">
            <div className="userprofilemetrics w-row">
              <div className="w-col w-col-4">
                <h1>{userAccount.userName}</h1>
                <div>Submitted Posts</div>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Posts</h1>
                <h1>{userAccount.submitted.length}</h1>
              </div>
              <div className="w-col w-col-4">
                <h1>Total Votes</h1>
                <h1>{userAccount.totalVotes}</h1>
              </div>
            </div>
          </div>
          <List />
        </div>
      )
    }
  }
}

export default UserProfile