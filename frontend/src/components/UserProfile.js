import React, { Component } from 'react';
import List from '../containers/ListContainer.js';
import PostBox from '../components/PostBox.js';
import Header from './Header.js'

class UserProfile extends Component {
  render() {
    var userAccount = this.props.userAccount;
    return (
      <div>
        <Header /> <br/>
        {this.props.showPostBoxId==='frontPage'? 
        <PostBox newPost={this.props.newPost} parent='' /> : <span/>}
        <div className="w-container">
          <div className="userprofilemetrics w-row">
            <div className="w-col w-col-4">
              <h1>{userAccount.userName}</h1>
              <div>Submitted Posts</div>
              <div>Upvoted Posts</div>
              <div>Downvoted Posts</div>
              <div>Saved Posts</div>
              <div>Settings</div>
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
      </div>
    );
  }
}

export default UserProfile;