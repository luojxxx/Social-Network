import React, { Component } from 'react';
import List from '../containers/ListContainer.js';
import PostBox from '../containers/PostBoxContainer.js';
import Header from './Header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header /> <br/>
        <PostBox />
        <List />
      </div>
    );
  }
}

export default App;
