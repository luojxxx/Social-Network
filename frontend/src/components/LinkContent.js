import React, {Component} from 'react'

class LinkContent extends Component{
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

  renderContent = (url) => {
    if (this.extractHostname(url).includes('imgur')) {
      return this.renderImgur(url)
    }
    if (this.extractHostname(url).includes('youtube')
      || this.extractHostname(url).includes('youtu')) {
      return this.renderYouTube(url)
    }
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

    return this.renderContent(url)
  }
}

export default LinkContent