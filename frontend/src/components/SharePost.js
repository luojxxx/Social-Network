import React, { Component } from 'react'
import { hostUrl } from '../config'

import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');
const EmailIcon = generateShareIcon('email');


class SharePost extends Component {
  closeButtonOrOutsideModalClose = (e) => {
    if (e.target.className === 'modal' 
      || e.target.className === 'fontawesome modalCloseButton') {
      this.props.closeSharePostPopup()
    }
  }

  render() {
    var postData = this.props.postData
    if (postData === null) {
      return ''
    }

    const shareUrl = hostUrl+'/post/'+postData._id
    const title = postData.contentTitle

    return (
      <div className="modal" onClick={this.closeButtonOrOutsideModalClose} name='modal'>
        <div className="modal-content" name='modal-content'>
          <div className="rightJustify">
            <div 
              onClick={this.closeButtonOrOutsideModalClose} 
              className='fontawesome modalCloseButton'>
              Close{' '}&#xf00d;
            </div>
          </div>
          <h3>{postData.contentTitle}</h3>
          {postData.contentLink}<br/><br/>

          <div className="socialShareButtonBar">
            <div className="socialButtons">
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="socialButtons__share-button">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
            </div>

            <div className="socialButtons">
              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="socialButtons__share-button">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
            </div>

            <div className="socialButtons">
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="socialButtons__share-button">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>
            </div>

            <div className="socialButtons">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="socialButtons__share-button">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <div className="socialButtons">
              <GooglePlusShareButton
                url={shareUrl}
                className="socialButtons__share-button">
              <GooglePlusIcon
                size={32}
                round />
              </GooglePlusShareButton>
            </div>

            <div className="socialButtons">
              <LinkedinShareButton
                url={shareUrl}
                title={title}
                windowWidth={750}
                windowHeight={600}
                className="socialButtons__share-button">
                <LinkedinIcon
                  size={32}
                  round />
              </LinkedinShareButton>
            </div>

            <div className="socialButtons">
              <PinterestShareButton
                url={shareUrl}
                windowWidth={1000}
                windowHeight={730}
                className="socialButtons__share-button">
                <PinterestIcon size={32} round />
              </PinterestShareButton>
            </div>

            <div className="socialButtons">
              <TumblrShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="socialButtons__share-button">
                <TumblrIcon
                  size={32}
                  round />
              </TumblrShareButton>
            </div>

            <div className="socialButtons">
              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                className="socialButtons__share-button">
                <EmailIcon
                  size={32}
                  round />
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SharePost