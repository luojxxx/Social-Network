import React, { Component } from 'react'
import List from '../containers/ListContainer'
import SortingDropDown from './SortingDropDown'

class PostPage extends Component {
  componentWillMount() {
    this.props.loadPost(this.props.params.postId)
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.params.postId !== nextProps.params.postId) {
        this.props.loadPost(nextProps.params.postId)
      }
    }

  render() {
    if (this.props.pageLoading === true) {
      return ''
    }

    return (
      <div>
        <SortingDropDown sortPosts={this.props.sortPosts} />
        <List />
      </div>
    )
  }
}

export default PostPage