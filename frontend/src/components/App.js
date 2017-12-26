import React, { Component } from 'react';
import List from '../containers/ListContainer.js';
import NewPost from '../containers/NewPostContainer.js';
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header /> <br/>
        <NewPost />
        <List />
      </div>
    );
  }
}

export default App;
