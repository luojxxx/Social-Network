import React, {Component} from 'react'
import { Link } from 'react-router'
import MenuBar from './MenuBar'
import PostBox from './PostBox'

class App extends Component {
  componentWillMount() {
    this.props.loadUserData()
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default App