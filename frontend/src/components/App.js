import React, { Component } from 'react';
import List from '../containers/ListContainer.js';
import PostBox from '../components/PostBox.js';
import Header from './Header.js'

class App extends Component {
  componentWillMount() {
    this.props.loadFrontPageData();
  }

  render() {
    return (
      <div className="App">
        <Header /> <br/>
        {this.props.showPostBoxId==='frontPage'? 
        <PostBox newPost={this.props.newPost} parent='' /> : ''}
        <List />
      </div>
    );
  }
}

export default App;