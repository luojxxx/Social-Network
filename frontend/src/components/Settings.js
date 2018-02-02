import React, {Component} from 'react'

const marginZero = {margin: '0px'}

class Settings extends Component{
  constructor(props) {
      super(props)
      this.state={
        userName: this.props.userAccount.userName
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
    if (this.props.userAccount.userName !== this.state.userName) {
      this.props.changeUserName(this.state.userName)
    }
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
          <br /><br />
          <input type='text' 
          value={this.state.userName}
          onChange={this.updateUserName} 
          maxLength="32"
          className='textField'
          style={marginZero} /> 
          <br /><br/>
          <button
          onClick={this.submitUserName}
          className='w-button'>Submit</button> <br/>
        </div>
      </div>
      )}
}

export default Settings