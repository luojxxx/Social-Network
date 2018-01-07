import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import MenuBar from './MenuBar'
import PostBox from './PostBox'

class Header extends Component {
  componentWillMount() {
    this.props.loadUserData()
  }

  render() {
    var props = this.props
    return (
      <div className="header w-container">
        <div className="heading-inner w-row">
          <div className="site-logo-title w-col w-col-4">
            <Link to='/'>
              <img src="https://d3e54v103j8qbb.cloudfront.net/img/image-placeholder.svg" width="79" />
            </Link>
            <Link to='/'>
              <h1 className="heading">GEDDIT</h1>
            </Link>
            <h3>{props.subheader}</h3>
          </div>
          <MenuBar 
          userAccount={props.userAccount} 
          newPost={props.newPost} 
          logout={props.logout} 
          showPostBox={props.showPostBox} />
        </div>
        {props.showPostBoxId==='frontPage'? 
        <PostBox newPost={props.newPost} parent='' /> : ''}
      </div>
  )}
}

 

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Header