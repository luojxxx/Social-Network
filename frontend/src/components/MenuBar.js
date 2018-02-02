import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import {TweenLite} from 'gsap'

import NotificationIcon from './NotificationIcon'
import { hostUrl } from '../config'
import {stringify} from 'query-string'
import googleLoginButton from '../images/gbutton1.png'

const notHighlighted = {color:'#313131'}
const highlighted = {color:'#F67D29'}

class MenuBar extends Component{
  constructor(props){
    super(props)
    this.state={
      searchQuery: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname.includes('search') &&
      nextProps.location.pathname.includes('search')===false) {
      this.setState({searchQuery: ''})
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

  renderNotificationIcon = () => {
    if (this.props.userAccount.newNotifications===true) {
      return <NotificationIcon newNotifications={this.props.userAccount.newNotifications} />
    } else {
      return <div className='fontawesome' style={notHighlighted}>&#xf003;</div>
    }
  }

  logout = () => {
    this.props.logout()
    browserHistory.replace('/')
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div className='menubar'>
        <div className='searchBox' id='searchBox'>
          <input 
            value={this.state.searchQuery}
            onChange={this.updateSearchField} 
            onKeyPress={this.onEnter} 
            type='text' 
            placeholder='Search'
            className='menuBarActionSpacing transparentInputField' />
          <button 
            onClick={this.searchResultsRedirect} 
            className='fontawesome menuBarActionSpacing'>
            &#xf002;
          </button>
        </div>
        {(userAccount.loggedIn)
          ?<div className='menuBarActionCluster'>
          <button 
            onClick={this.props.togglePostForm} 
            style={(this.props.showPostForm)?highlighted:{}}
            className="fontawesome menuBarActionSpacing">
            &#xf067;{' '}Post
          </button>
          <Link 
            to='/notifications' 
            className="fontawesome menuBarActionSpacing"
            id='notificationsIcon' >
            {(this.checkPage('notifications'))
              ?<div className='fontawesome' style={highlighted}>&#xf003;</div>
              :this.renderNotificationIcon()}
          </Link>
          <Link 
            to='/settings' 
            className="fontawesome menuBarActionSpacing"
            style={(this.checkPage('settings')?highlighted:{})}>
            &#xf013;{' '}
          </Link>
          <Link 
            to={'/userprofile/'+userAccount.userId+'/submitted'} 
            className="menuBarActionSpacing"
            style={(this.checkPage('userprofile')?highlighted:{})}>
            {userAccount.userName}
          </Link>
          {' '}
          <button onClick={this.logout} className="menuBarActionSpacing">Logout</button>
          </div>
          :<a href={hostUrl+'auth/google/'} >
            <img src={googleLoginButton} height='38px' className="" />
          </a>}
      </div>
      )}
}

export default MenuBar