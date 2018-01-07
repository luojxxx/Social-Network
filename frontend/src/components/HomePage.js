import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'

class HomePage extends Component {
  componentWillMount() {
    this.props.loadFrontPageData()
  }

  render() {
    return (
      <div>
        <Header subheader='Front Page' /> <br/>
        <List />
      </div>
    )
  }
}

export default HomePage