import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'

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