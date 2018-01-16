import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import Pagination from '../containers/PaginationContainer'
import {defaultPage} from '../libraryHelper'

class SearchResults extends Component {
  componentWillMount() {
    this.props.search(
      this.props.location.query.q,
      defaultPage(this.props.location.query.page))
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query !== nextProps.location.query) {
        this.props.search(
          nextProps.location.query.q,
          defaultPage(nextProps.location.query.page))
      }
  }

  render() {
    return (
      <div>
        <Header subheader='Search Results' /> <br/>
        <List />
        <Pagination
          urlStem='search' 
          query={{
            page: defaultPage(this.props.location.query.page),
            q: this.props.location.query.q}} />
      </div>
    )
  }
}

export default SearchResults