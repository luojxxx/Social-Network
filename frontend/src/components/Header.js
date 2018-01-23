import React, {Component} from 'react'
import { Link } from 'react-router'
import MenuBar from './MenuBar'
import PostBox from '../containers/PostBoxContainer'

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      showPostForm: false
    }
  }

  togglePostForm = () => {
    if (this.state.showPostForm === false) {
      this.setState({showPostForm: true})
    } else {
      this.setState({showPostForm: false})
    }
  }

  render() {
    var props = this.props
    return (
      <div className="header">
        <div className="heading-inner w-row">
          <div className="site-logo-title w-col w-col-4">
            <Link to='/'>
              <img src="https://d3e54v103j8qbb.cloudfront.net/img/image-placeholder.svg" width="79" />
            </Link>
            <Link to='/'>
              <h1 className="heading">GEDDIT</h1>
            </Link>
            <h3>{props.subheading}</h3>
          </div>
          <MenuBar 
            userAccount={props.userAccount} 
            logout={props.logout} 
            togglePostForm={this.togglePostForm} />
        </div>
        {this.state.showPostForm
          ?<PostBox 
            parent='' 
            post={{
              contentTitle: '',
              contentTag: '',
              contentLink: '',
              contentDescription: ''
            }}
            newOrEdit='new'
            closePostBox={this.togglePostForm} />
          :''}
      </div>
  )}
}

export default Header