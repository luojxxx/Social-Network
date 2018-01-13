import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'
import Pagination from './Pagination'

class HomePage extends Component {
  componentWillMount() {
    this.props.loadFrontPageData(this.defaultPage(this.props.location.query.page))
  }

  componentWillReceiveProps(nextProps) {
      if (this.props.location.query.page !== nextProps.location.query.page) {
        this.props.loadFrontPageData(this.defaultPage(nextProps.location.query.page))
      }
  }

  defaultPage = (page) => {
    return (typeof(page)!=='undefined')
              ?page
              :1
  }

  render() {
    return (
      <div>
        <Header subheader='Front Page' /> <br/>
        <List />
        <Pagination 
          pages={this.props.displayedPosts.pages} 
          page={this.defaultPage(this.props.location.query.page)} />
      </div>
    )
  }
}

export default HomePage