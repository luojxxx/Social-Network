import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {stringify} from 'query-string'

class Pagination extends Component {
  changePage = (value) => {
    var query = stringify({page: value})
    browserHistory.replace('?'+query)
  }

  render() {
    var page = parseInt(this.props.page)
    if (this.props.pages === 0) {
      return ''
    }
    return (
      <div>
        {[...Array(this.props.pages).keys()].map((ele)=>{
          let style = {}
          if (page === ele+1) {
            style = {color:'red'}
          }
          return (
            <button 
              style={style}
              onClick={()=>this.changePage(ele+1)}>
              {ele+1}
            </button>)
        })}
      </div>
    )
  }
}

export default Pagination