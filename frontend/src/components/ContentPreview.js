import React, {Component} from 'react'

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

  renderThumbnail = (url) => {
    if (this.extractHostname(url).includes('imgur')) {
      return this.renderImgurThumbnail(url)
    }
    if (this.extractHostname(url).includes('youtube')) {
      return this.renderYouTubeThumbnail(url)
    }
  }

  renderContent = (url) => {
    if (this.extractHostname(url).includes('imgur')) {
      return this.renderImgur(url)
    }
    if (this.extractHostname(url).includes('youtube')) {
      return this.renderYouTube(url)
    }
  }
  

  renderImgurThumbnail = (url) => {
    url = url.slice(0,8)+'i.'+url.slice(8)+'s.jpg'
    return <div><img src={url} /></div>
  }

  renderImgur = (url) => {
    url = url.slice(0,8)+'i.'+url.slice(8)+'.jpg'
    return <div><img src={url} /></div>
  }

  getYouTubeVideoId = (url) => {
    var videoId = ''
    if (url.includes('https://www.youtube.com/watch?v=')) {
      videoId = url.slice(32)
    }

    if (url.includes('https://youtu.be/')) {
      videoId = url.slice(17)
    }
    return videoId
  }

  renderYouTubeThumbnail = (url) => {
    var videoId = this.getYouTubeVideoId(url)
    var srcUrl = 'https://img.youtube.com/vi/'+videoId+'/default.jpg'
    return <div><img src={srcUrl} /></div>
  }

  renderYouTube = (url) => {
    var youtubePlayerUrl = 'https://www.youtube.com/embed/'
    youtubePlayerUrl += this.getYouTubeVideoId(url) 
    youtubePlayerUrl += '?autoplay=1'

    return (
      <div>
        <iframe width="560" height="315" 
        src={youtubePlayerUrl}
        frameBorder="0" 
        gesture="media" 
        allow="encrypted-media" 
        allowFullScreen>
        </iframe>
      </div>
      )
  }

  render() {
    var url = this.props.url
    if (url === '') {
      return ''
    } 

    return (
      <div>
        <div onClick={this.updateShowPreview}>
          {this.renderThumbnail(url)}
        </div>
      {(this.state.showPreview===true)
        ?this.renderContent(url)
        :''}
      </div>
    )}
}

export default ContentPreview