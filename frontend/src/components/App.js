import React, { Component } from 'react';
import './App.css';
import List from '../containers/ListContainer.js';
import Login from './Login.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login /> <br/>
        <List />
      </div>
    );
  }
}

export default App;
