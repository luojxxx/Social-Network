import React, {Component} from 'react'
import Header from '../containers/HeaderContainer'

class Settings extends Component{
  constructor(props) {
      super(props)
      this.state={
          userName: ''
      }
  }

  componentDidMount() {
    this.props.setSubHeading('Settings')
  }

  updateUserName = (e) => {
    e.preventDefault()
    this.setState({userName: e.target.value})
  }

  submitUserName = (e) => {
    e.preventDefault()
    this.props.changeUserName(this.state.userName)
  }

  render() {
    var userAccount = this.props.userAccount
    return (
      <div>
        <div className="w-container">
          <h4>Change username:</h4>
          Note: You can change your username to anything that hasn't already been taken.
          <br />
          And you also give up your old username.
          <br />
          <input type='text' 
          defaultValue={userAccount.userName}
          onChange={this.updateUserName} 
          maxLength="32"
          className='settingsInputField' /> 
          <br /> <br/>
          <button
          onClick={this.submitUserName}
          className='w-button'>Submit</button> <br/>
        </div>
      </div>
      )}
}

export default Settings