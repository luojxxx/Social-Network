import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
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
      <div className='flexRowCluster'>
        <input 
          onChange={this.updateSearchField} 
          onKeyPress={this.onEnter} 
          type='text' 
          name='searchField'
          className='padding_small' />
        <button 
          onClick={this.searchResultsRedirect} 
          className='fontawesome padding_small'>
          &#xf002;
        </button>
        {(userAccount.loggedIn)
          ?<div className='flexRowCluster'>
          <button 
            onClick={this.props.togglePostForm} 
            style={(this.props.showPostBoxId==='frontPage')?{color:'blue'}:{}}
            className="fontawesome padding_small">
            &#xf067;{' '}Post
          </button>
          <Link to='/notifications' className="fontawesome padding_small">
            &#xf003; {' '}
          </Link>
          <Link to='/settings' className="fontawesome padding_small">
            &#xf013; {' '}
          </Link>
          <Link to={'/userprofile/'+userAccount.userId+'/submitted'} className="padding_small">
            {userAccount.userName}
          </Link>
          {' '}
          <button onClick={this.props.logout} className="padding_small">Logout</button>
          </div>
          :<a href={hostUrl+'auth/google/'} className="padding_small">
            <img src={googleLoginButton} />
          </a>}
      </div>
      )}
}

export default MenuBar