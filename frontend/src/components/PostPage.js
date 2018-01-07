import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'

class PostPage extends Component {
  componentWillMount() {
    this.props.loadPost(this.props.params.postId)
  }

  render() {
    return (
      <div>
        <Header subheader='Post Page' /> <br/>
        <List />
      </div>
    )
  }
}

export default PostPage