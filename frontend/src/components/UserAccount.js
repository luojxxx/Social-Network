import React, {Component} from 'react'
import PropTypes from 'prop-types'

class UserAccount extends Component{
  componentDidMount(){
  }

  render() {
    var props = this.props;
    return (
      <div className="username-options w-col w-col-8">
        <a href="#" className="w-button">Username</a>
        <a href='http://localhost:3000/auth/google/' className="w-button">Login/Out</a>
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default UserAccount