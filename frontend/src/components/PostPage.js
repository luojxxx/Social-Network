import React, { Component } from 'react'
import Header from '../containers/HeaderContainer.js'
import List from '../containers/ListContainer.js'

class PostPage extends Component {
  render() {
    return (
      <div>
        <Header /> <br/>
        <List loadPage='postPage' params={this.props.params} />
      </div>
    )
  }
}

export default PostPage