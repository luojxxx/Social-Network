import React, {Component} from 'react'
import PropTypes from 'prop-types'

class UserAccount extends Component{
  componentDidMount(){
    this.props.loadUserData();
  }

  showPostBox = (e) => {
    this.props.showPostBox('frontPage')
  }

  render() {
    var userAccount = this.props.userAccount;
    return (
      <div className="username-options w-col w-col-8">
        <a onClick={this.showPostBox} href="#" className="w-button">New Post</a>

        <a href="#" className="w-button">{userAccount.userName}</a>

        {(userAccount.loggedIn)? 
        <a onClick={this.props.logout} href='#' className="w-button">Logout</a>: <span />}

        {(userAccount.loggedIn)? <span /> : 
        <a href='http://localhost:3000/auth/google/' className="w-button">Login</a>}
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default UserAccount