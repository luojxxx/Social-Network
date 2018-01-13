import React, {Component} from 'react'
import Header from '../containers/HeaderContainer'

class Settings extends Component{
  constructor(props) {
      super(props)
      this.state={
          userName: ''
      }
  }

  updateUserName = (e) => {
    e.preventDefault()
    this.setState({userName: e.target.value})
  }

  submitUserName = (e) => {
    e.preventDefault()
    this.props.changeUserName(this.props.userAccount.userId, this.state.userName)
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div>
        <Header subheader='Settings' /> <br/>
        <div className="content-block w-container">
          Settings <br/><br/>
          Username: 
          <input type='text' 
          defaultValue={userAccount.userName}
          onChange={this.updateUserName} 
          maxLength="32" /> 
          <button onClick={this.submitUserName}>Submit</button> <br/>
          You can change your username to anything that hasn't already been taken <br/><br/>
        </div>
      </div>
      )}
}

export default Settings