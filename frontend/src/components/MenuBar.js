import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class MenuBar extends Component{
  componentWillMount(){
    this.props.loadUserData()
  }

  showPostBox = (e) => {
    this.props.showPostBox('frontPage')
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div className="username-options w-col w-col-8">
        <input type='text' name='searchField' />
        <button className='w-button'>Search</button>
        <a 
        onClick={this.showPostBox} 
        style={(this.props.showPostBoxId==='frontPage')?{color:'blue'}:{}}
        href="#" 
        className="w-button">
        New Post</a>

        {(userAccount.loggedIn)?<Link to={'/userprofile/'+userAccount.userId} className="w-button">
        {userAccount.userName}</Link>: ''}
        
        {(userAccount.loggedIn)? 
        <a onClick={this.props.logout} href='#' className="w-button">Logout</a>:''}

        {(userAccount.loggedIn)? '': 
        <a href='http://localhost:3000/auth/google/' className="w-button">Login</a>}
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default MenuBar