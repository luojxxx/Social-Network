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
          className='...'>
          Search
        </button>
        {(userAccount.loggedIn)
          ?<div>
          <button 
            onClick={this.props.togglePostForm} 
            style={(this.props.showPostBoxId==='frontPage')?{color:'blue'}:{}}
            className="...">
            New Post
          </button>
          <Link to='/notifications' className="... fontawesome">
            &#xf003; {' '}
          </Link>
          <Link to={'/userprofile/'+userAccount.userId+'/submitted'} className="...">
            {userAccount.userName}
          </Link>
          <button onClick={this.props.logout} className="...">Logout</button>
          </div>
          :<a href={hostUrl+'auth/google/'} className="...">Login</a>}
      </div>
      )}
}

export default MenuBar