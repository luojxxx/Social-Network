import React, { Component } from 'react'
import {Link} from 'react-router'
import Pagination from '../containers/PaginationContainer'
import {defaultPage} from '../libraryHelper'

class Notifications extends Component {
  componentWillMount() {
    this.props.loadNotifications(defaultPage(this.props.location.query.page))
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query !== nextProps.location.query) {
        this.props.loadNotifications(defaultPage(nextProps.location.query.page))
      }
  }

  renderNotification = (notification) => {
    if (notification.notificationType === 'reply') {
      let data = notification.data
      return (
        <div key={data.newPostId} className='notification'>
          <Link to={'/userprofile/'+data.newPostUserId+'/submitted'}>
            {data.newPostUserName}
          </Link>
          {' replied to '}
          <Link to={'/post/'+data.parentPostId}>
            {data.parentPostTitle+':'}
          </Link>
          <br />
          <Link to={'/post/'+data.newPostId}>
            <div className='fontawesome'>
            &#xf0a9; {' '}
            {data.newPostTitle}
            </div>
          </Link>
        </div>
        )
    }
  }

  render() {
    if (this.props.pageLoading === true) {
      return ''
    }

    return (
      <div className=''>
        {this.props.notifications.map((ele, idx)=>{
          return this.renderNotification(ele)
        })}
        <Pagination 
          urlStem='notifications' 
          query={{page: defaultPage(this.props.location.query.page)}} />
      </div>
    )
  }
}

export default Notifications