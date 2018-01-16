import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import Pagination from './Pagination'
import {defaultPage} from '../libraryHelper'

class HomePage extends Component {
  componentWillMount() {
    this.props.loadFrontPageData(defaultPage(this.props.location.query.page))
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query.page !== nextProps.location.query.page) {
        this.props.loadFrontPageData(defaultPage(nextProps.location.query.page))
      }
  }

  render() {
    return (
      <div>
        <Header subheader='Front Page' /> <br/>
        <List />
        <Pagination 
          pages={this.props.displayedPosts.pages} 
          page={defaultPage(this.props.location.query.page)} />
      </div>
    )
  }
}

export default HomePage