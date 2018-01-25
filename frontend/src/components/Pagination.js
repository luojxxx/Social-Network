import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import {stringify} from 'query-string'

class Pagination extends Component {
  changePage = (value) => {
    var query = stringify(value)
    browserHistory.replace(this.props.urlStem+'?'+query)
  }

  render() {
    var page = parseInt(this.props.query.page)
    if (this.props.pages <= 1) {
      return ''
    }
    return (
      <div className='centerJustify'>
        {[...Array(this.props.pages).keys()].map((ele)=>{
          let style = {}
          if (page === ele) {
            style = {color:'#F67D29'}
          }
          return (
            <button 
              style={style}
              className='pageButtons'
              key={ele}
              onClick={()=>this.changePage({page: ele, q: this.props.query.q})}>
              {ele+1}
            </button>)
        })}
      </div>
    )
  }
}

export default Pagination