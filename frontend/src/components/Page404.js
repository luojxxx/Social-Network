import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'

class Page404 extends Component {
  render() {
    return (
      <div>
        <Header /> <br/>
        <div className="w-container centerJustify">
          <h1>Page not found</h1>
        </div>
      </div>
    )
  }
}

export default Page404