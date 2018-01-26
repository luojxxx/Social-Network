import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import TweenLite from 'gsap'

import { hostUrl } from '../config'
import {stringify} from 'query-string'
import googleLoginButton from '../images/gbutton1.png'

class MenuBar extends Component{
  constructor(props){
    super(props)
    this.state={
      searchQuery: ''
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

  render() {
    var userAccount = this.props.userAccount
    return (
      <div className='flexRowCluster menubar'>
        <div className='searchBox' id='searchBox'>
          <input 
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
          <Link to='/notifications' className="fontawesome padding_small">
            &#xf003;{' '}
          </Link>
          <Link to='/settings' className="fontawesome padding_small">
            &#xf013;{' '}
          </Link>
          <Link to={'/userprofile/'+userAccount.userId+'/submitted'} className="padding_small">
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