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
        <div className="content-block w-container">
          Change username to:{' '}
          <input type='text' 
          defaultValue={userAccount.userName}
          onChange={this.updateUserName} 
          maxLength="32" /> 
          <button
          onClick={this.submitUserName}
          className='w-button'>Submit</button> <br/>
          Note: You can change your username to anything that hasn't already been taken. And you also give up your old username. <br/><br/>
        </div>
      </div>
      )}
}

export default Settings