import React, { Component } from 'react'
import Header from '../containers/HeaderContainer.js'
import List from '../containers/ListContainer.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header /> <br/>
        <List loadPage='frontPage' />
      </div>
    )
  }
}

export default App