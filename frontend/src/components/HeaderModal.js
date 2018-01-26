import React, {Component} from 'react'
import TweenLite from 'gsap'

class HeaderModal extends Component {
  componentDidMount() {
    var modal = document.getElementById('headerModal')
    TweenLite.from(modal, 1, {top: -100})

    setTimeout(()=>{
      this.dismissBanner()
    }, 10000)
  }

  dismissBanner = () => {
    var modal = document.getElementById('headerModal')
    TweenLite.to(modal, 1, {top: -100, onComplete:this.closeBanner})
  }

  closeBanner = () => {
    this.props.updateBanner('')
  }

  render() {
    var props = this.props
    return (
      <div className="headerModal" id='headerModal'>
        <div className="headerModalContent" onClick={this.dismissBanner} >
          {props.bannerMsg}
        </div>
      </div>
  )}
}

export default HeaderModal


