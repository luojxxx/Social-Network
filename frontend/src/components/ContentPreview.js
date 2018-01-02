import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ContentPreview extends Component{
  constructor(props) {
      super(props)
      this.state={
          showPreview: false
      }
  }

  extractHostname = (url) => {
      var hostname = ''
      //find & remove protocol (http, ftp, etc.) and get hostname
      if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2]
      } else {
        hostname = url.split('/')[0]
      }

      //find & remove port number
      hostname = hostname.split(':')[0]
      //find & remove "?"
      hostname = hostname.split('?')[0]

      return hostname
  }

  updateShowPreview = () => {
    if (this.state.showPreview === false) {
      this.setState({showPreview: true})
    } else {
      this.setState({showPreview: false})
    }
  }

  renderPreview = (url) => {
    if (this.extractHostname(url)==='imgur.com') {
      return this.renderImgur(url)
    }
  }

  renderImgur = (url) => {
    url = url.slice(0,8)+'i.'+url.slice(8)+'.jpg'
    return (
      <div>
        <img src={url} />
      </div>
      )
  }

  render() {
    return (
      <div>
      {(this.props.url !== '')
        ?<button onClick={this.updateShowPreview}>ShowPreview</button>
        :''}
      {(this.state.showPreview===true)
        ?this.renderPreview(this.props.url)
        :''}
      </div>
    )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default ContentPreview