import React, {Component} from 'react'

class App extends Component {
  componentWillMount() {
    this.props.loadUserData()
  }

  render() {
    return <div className='w-container'>{this.props.children}</div>
  }
}

export default App