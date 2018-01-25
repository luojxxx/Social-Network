import React, {Component} from 'react'
import { Link } from 'react-router'
import MenuBar from './MenuBar'
import PostBox from '../containers/PostBoxContainer'
import logo from '../images/logo.png'

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
      <div>
        <div className="header">
          <div className='flexRowCluster'>
            <Link to='/'>
              <img src={logo} max-width="40px" max-height="40px" width="40px" height="40px" />
            </Link>
            <Link to='/'>
              <h1 className="">GEDDIT</h1>
            </Link>
            <h3 className=''>{props.subheading}</h3>
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


