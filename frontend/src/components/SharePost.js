import React, { Component } from 'react'
import { hostUrl } from '../config'

import {
  ShareButtons,
  ShareCounts,
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
    render() {
      var postData = this.props.postData
      if (postData === null) {
        return ''
      }

      const shareUrl = hostUrl+'/post/'+postData._id
      const title = postData.contentTitle

      return (
        <div className="modal" onClick={this.props.closeSharePostPopup} name='modal'>
          <div className="modal-content" name='modal-content'>
            <div className="rightJustify">
              <span onClick={this.props.closeSharePostPopup} className='closeButton'>
                Close
              </span>
            </div>
            <h3>{postData.contentTitle}</h3>
            {postData.contentLink}<br/><br/>

            <div className="socialShareButtonBar">
              <div className="Demo__some-network">
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="Demo__some-network__share-button">
                  <FacebookIcon
                    size={32}
                    round />
                </FacebookShareButton>
              </div>

              <div className="Demo__some-network">
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button">
                  <TwitterIcon
                    size={32}
                    round />
                </TwitterShareButton>
              </div>

              <div className="Demo__some-network">
                <RedditShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button">
                  <RedditIcon
                    size={32}
                    round />
                </RedditShareButton>
              </div>

              <div className="Demo__some-network">
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="Demo__some-network">
                <GooglePlusShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button">
                <GooglePlusIcon
                  size={32}
                  round />
                </GooglePlusShareButton>
              </div>

              <div className="Demo__some-network">
                <LinkedinShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={750}
                  windowHeight={600}
                  className="Demo__some-network__share-button">
                  <LinkedinIcon
                    size={32}
                    round />
                </LinkedinShareButton>
              </div>

              <div className="Demo__some-network">
                <PinterestShareButton
                  url={shareUrl}
                  windowWidth={1000}
                  windowHeight={730}
                  className="Demo__some-network__share-button">
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>

              <div className="Demo__some-network">
                <TumblrShareButton
                  url={shareUrl}
                  title={title}
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button">
                  <TumblrIcon
                    size={32}
                    round />
                </TumblrShareButton>
              </div>

              <div className="Demo__some-network">
                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body="body"
                  className="Demo__some-network__share-button">
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