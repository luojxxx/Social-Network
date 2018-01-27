import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import {TweenLite, TweenMax} from 'gsap'

import { hostUrl } from '../config'
import {stringify} from 'query-string'
import googleLoginButton from '../images/gbutton1.png'

class MenuBar extends Component{
  constructor(props){
    super(props)
    this.state={
      searchQuery: ''
    }
    this.newNotificationsTween = new TimelineMax({repeat:-1, yoyo:true})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname.includes('search') &&
      nextProps.location.pathname.includes('search')===false) {
      this.setState({searchQuery: ''})
    }

    var notificationsIcon = document.getElementById('notificationsIcon')
    if (nextProps.userAccount.newNotifications === true) {
      this.newNotificationsTween.to(notificationsIcon, 1.5, {color:'#F67D29'})
    } else {
      this.newNotificationsTween.kill()
    }
  }

  updateSearchField = (e) => {
    this.setState({searchQuery: e.target.value})
  }

  searchResultsRedirect = () => {
    var searchBox = document.getElementById('searchBox')
    TweenLite.fromTo(searchBox, 1.5, {
      color:'#F67D29',
      borderColor: '#F67D29'
    },{
      color:'#313131',
      borderColor: '#313131'
    })

    if (this.state.searchQuery !== '') {
      var query = stringify({q: this.state.searchQuery})
        browserHistory.replace('/search?'+query)
    }
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.searchResultsRedirect()
    }
  }

  checkPage = (icon) => {
    if (icon === 'settings') {
      if (this.props.location.pathname.includes('settings')) {
        return true
      }
    }

    if (icon === 'notifications') {
      if (this.props.location.pathname.includes('notification')) {
        return true
      }
    }

    if (icon === 'userprofile') {
      if (this.props.location.pathname.includes('userprofile') &&
        this.props.location.pathname.includes(this.props.userAccount.userId)) {
        return true
      }
    }
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div className='flexRowCluster menubar'>
        <div className='searchBox' id='searchBox'>
          <input 
            value={this.state.searchQuery}
            onChange={this.updateSearchField} 
            onKeyPress={this.onEnter} 
            type='text' 
            placeholder='Search'
            className='padding_small transparentInputField' />
          <button 
            onClick={this.searchResultsRedirect} 
            className='fontawesome padding_small'>
            &#xf002;
          </button>
        </div>
        {(userAccount.loggedIn)
          ?<div className='flexRowCluster'>
          <button 
            onClick={this.props.togglePostForm} 
            style={(this.props.showPostForm)?{color:'#F67D29'}:{}}
            className="fontawesome padding_small">
            &#xf067;{' '}Post
          </button>
          <Link 
            to='/notifications' 
            className="fontawesome padding_small"
            id='notificationsIcon'
            style={(this.checkPage('notifications')?{color:'#F67D29'}:{})}>
            &#xf003;{' '}
          </Link>
          <Link 
            to='/settings' 
            className="fontawesome padding_small"
            style={(this.checkPage('settings')?{color:'#F67D29'}:{})}>
            &#xf013;{' '}
          </Link>
          <Link 
            to={'/userprofile/'+userAccount.userId+'/submitted'} 
            className="padding_small"
            style={(this.checkPage('userprofile')?{color:'#F67D29'}:{})}>
            {userAccount.userName}
          </Link>
          {' '}
          <button onClick={this.props.logout} className="padding_small">Logout</button>
          </div>
          :<a href={hostUrl+'auth/google/'} className="padding_small">
            <img src={googleLoginButton} height='38px' />
          </a>}
      </div>
      )}
}

export default MenuBar