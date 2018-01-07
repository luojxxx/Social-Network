import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'

class SearchResults extends Component {
  componentWillMount() {
    this.props.search(this.props.location.query.q)
  }

  render() {
    return (
      <div>
        <Header subheader='Search Results' /> <br/>
        <List />
      </div>
    )
  }
}

export default SearchResults