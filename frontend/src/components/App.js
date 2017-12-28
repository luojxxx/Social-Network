import React, { Component } from 'react';
import List from '../containers/ListContainer.js';
import Header from '../containers/HeaderContainer.js'

class App extends Component {
  render() {
    return (
      <div>
        <Header /> <br/>
        <List loadPage='frontPage' />
      </div>
    );
  }
}

export default App;