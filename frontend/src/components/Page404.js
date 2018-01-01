import React, { Component } from 'react'
import Header from '../containers/HeaderContainer.js'

class Page404 extends Component {
  render() {
    return (
      <div>
        <Header /> <br/>
        <div className="content-block w-container">
          <h1>Page not found</h1>
        </div>
      </div>
    )
  }
}

export default Page404