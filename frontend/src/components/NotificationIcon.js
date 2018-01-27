import React, { Component } from 'react'
import {TimelineMax} from 'gsap'

class NotificationIcon extends Component {
  constructor(props){
    super(props)
    this.state={}
    this.newNotificationsTween = new TimelineMax({repeat:-1, yoyo:true})
  }

  toggleAnimation = () => {
    var notificationsIcon = document.getElementById('notificationsIcon')
    if (this.props.newNotifications && notificationsIcon!==null) {
      this.newNotificationsTween.to(notificationsIcon, 1.5, {color:'#F67D29'})
    } else {
      this.newNotificationsTween.kill()
    }
  }

  render() {
    console.log(this.props.newNotifications)
    console.log(document.getElementById('notificationsIcon'))
    this.toggleAnimation()
    if (this.props.newNotifications) {
      return (
        <div className='fontawesome' id='notificationsIcon'>
          &#xf003;
        </div>
      )
    } else {
      return (
        <div className='fontawesome' id='notificationsIcon' style={{color:'#313131'}}>
          &#xf003;
        </div>
      )
    }
  }
}

export default NotificationIcon