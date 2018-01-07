import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import { hostUrl } from '../config'
const queryString = require('query-string')

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
    var query = queryString.stringify({q: this.state.searchQuery})
    browserHistory.replace('/search?'+query)
  }

  onEnter = (e) => {
    if (e.key === 'Enter') {
      this.searchResultsRedirect()
    }
  }

  showPostBox = (e) => {
    this.props.showPostBox('frontPage')
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
        Search</button>
        {(userAccount.loggedIn)
          ?<a 
            onClick={this.showPostBox} 
            style={(this.props.showPostBoxId==='frontPage')?{color:'blue'}:{}}
            href="#" 
            className="w-button">
            New Post</a>
          :''}
        

        {(userAccount.loggedIn)
          ?<Link to={'/userprofile/'+userAccount.userId} className="w-button">
          {userAccount.userName}</Link>
          :''}
        
        {(userAccount.loggedIn)
          ?<a onClick={this.props.logout} href='#' className="w-button">Logout</a>
          :''}

        {(userAccount.loggedIn)
          ?''
          :<a href={hostUrl+'auth/google/'} className="w-button">Login</a>}
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default MenuBar