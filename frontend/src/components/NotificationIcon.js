import React, { Component } from 'react'
import {TimelineMax} from 'gsap'

class NotificationIcon extends Component {
  constructor(props){
    super(props)
    this.state={}
    this.newNotificationsTween = new TimelineMax({repeat:-1, yoyo:true})
  }

  componentDidMount() {
    var notificationsIcon = document.getElementById('notificationsIcon')
    this.newNotificationsTween.to(notificationsIcon, 1.5, {color:'#F67D29'})
  }

  componentWillUnmount() {
    var notificationsIcon = document.getElementById('notificationsIcon')
    this.newNotificationsTween.kill()
  }

  render() {
    return (
      <div className='fontawesome' id='notificationsIcon'>
        &#xf003;
      </div>
    )
  }
}

export default NotificationIcon