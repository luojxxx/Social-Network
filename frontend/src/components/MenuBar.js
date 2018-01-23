import React, {Component} from 'react'
import { Link, browserHistory } from 'react-router'
import { hostUrl } from '../config'
import {stringify} from 'query-string'

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
    var query = stringify({q: this.state.searchQuery})
    browserHistory.replace('/search?'+query)
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      if (this.state.searchQuery !== '') {
        this.searchResultsRedirect()
      }
    }
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div className="username-options w-col w-col-8">
        <input 
          onChange={this.updateSearchField} 
          onKeyPress={this.onEnter} 
          type='text' 
          name='searchField' />
        <button 
          onClick={this.searchResultsRedirect} 
          className='w-button'>
          Search
        </button>
        {(userAccount.loggedIn)
          ?<div>
          <button 
            onClick={this.props.togglePostForm} 
            style={(this.props.showPostBoxId==='frontPage')?{color:'blue'}:{}}
            className="w-button">
            New Post
          </button>
          <Link to='/notifications' className="w-button fontawesome">
            &#xf003;
          </Link>
          <Link to={'/userprofile/'+userAccount.userId+'/submitted'} className="w-button">
            {userAccount.userName}
          </Link>
          <button onClick={this.props.logout} className="w-button">Logout</button>
          </div>
          :<a href={hostUrl+'auth/google/'} className="w-button">Login</a>}
      </div>
      )}
}

export default MenuBar