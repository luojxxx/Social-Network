import React, { Component } from 'react'
import {Link} from 'react-router'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import Pagination from '../containers/PaginationContainer'
import PostBox from '../components/PostBox'
import {defaultPage} from '../libraryHelper'

class UserProfile extends Component {
  componentWillMount() {
    this.loadPageSwitch(this.props.params.subField, this.props)
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.params !== nextProps.params ||
          this.props.location.query !== nextProps.location.query) {
        this.loadPageSwitch(nextProps.params.subField, nextProps)
      }
    }

  loadPageSwitch = (subField, props) => {
    var page = defaultPage(props.location.query.page)
    switch (subField) {
      case 'submitted':
      this.props.loadUserProfile(
        props.params.userId, 
        page)
      break

      case 'upvoted':
      this.props.loadUserHistoryByField(
        props.userAccount.userId,
        'upvoted', 
        page)
      break

      case 'downvoted':
      this.props.loadUserHistoryByField(
        props.userAccount.userId, 
        'downvoted', 
        page)
      break

      case 'saved':
      this.props.loadUserHistoryByField(
        props.userAccount.userId, 
        'saved', 
        page)
      break

      default:
      this.props.loadUserProfile(
        props.params.userId, 
        page)
      break
    }
  }

  render() {
    if (this.props.pageLoading === true) {
      return <Header subheader='User Profile' />
    }
    
    var userProfile = this.props.userProfile
    var userId = this.props.params.userId
    var currentUser = userId === this.props.userAccount.userId

    return (
      <div>
        <Header subheader='User Profile' /> <br/>
        {this.props.showPostBoxId==='frontPage'? 
        <PostBox newPost={this.props.newPost} parent='' /> : ''}
        <div className="w-container">
          <div className="userprofilemetrics w-row">
            <div className="w-col w-col-4">
              <h1>{userProfile.userName}</h1>
              <Link to={'/userprofile/'+userId+'/submitted'}>Submitted Posts</Link>
              {(currentUser)
                ?
                <div>
                <Link to={'/userprofile/'+userId+'/upvoted'}>Upvoted posts</Link><br />
                <Link to={'/userprofile/'+userId+'/downvoted'}>Downvoted Posts</Link><br />
                <Link to={'/userprofile/'+userId+'/saved'}>Saved Posts</Link><br />
                <div><Link to='/settings'>Settings</Link></div>
                </div>
                :''
              }
            </div>
            <div className="w-col w-col-4">
              <h1>Total Posts</h1>
              <h1>{userProfile.totalPosts}</h1>
            </div>
            <div className="w-col w-col-4">
              <h1>Total Votes</h1>
              <h1>{userProfile.totalVotes}</h1>
            </div>
          </div>
        </div>
        <List />
        <Pagination 
        urlStem={'/userprofile/'+userId+'/'+this.props.params.subField}
        query={{page:defaultPage(this.props.location.query.page)}} />
      </div>
    )
  }
}

export default UserProfile