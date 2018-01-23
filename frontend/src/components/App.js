import React, {Component} from 'react'
import Header from '../containers/HeaderContainer'

class App extends Component {
  componentWillMount() {
    this.props.loadUserData()
  }

  render() {
    return (
      <div className='w-container'>
        <Header />
        {this.props.children}
      </div>)
  }
}

export default App