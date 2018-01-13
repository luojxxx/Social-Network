import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import Pagination from './Pagination'

class HomePage extends Component {
  page = (typeof(this.props.location.query.page)!=='undefined')
            ?this.props.location.query.page
            :1

  componentWillMount() {
    this.props.loadFrontPageData(this.page)
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query.page !== nextProps.location.query.page) {
        this.props.loadFrontPageData(nextProps.location.query.page)
      }
  }

  render() {
    return (
      <div>
        <Header subheader='Front Page' /> <br/>
        <List />
        <Pagination pages={this.props.displayedPosts.pages} page={this.page} />
      </div>
    )
  }
}

export default HomePage