import React, { Component } from 'react'
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
    if (this.props.pageLoading === true) {
      return ''
    }

    return (
      <div>
        Showing search results for "{this.props.location.query.q}"
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