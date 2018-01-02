import React, { Component } from 'react'
import Header from '../containers/HeaderContainer'
import List from '../containers/ListContainer'

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

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');
const EmailIcon = generateShareIcon('email');


class SharePage extends Component {
    render() {
      var postId = this.props.params.postId
      var postData = this.props.displayedPostsData[postId]

      const shareUrl = 'www.host.com'+'/post/'+postId
      const title = postData.contentTitle

      return (
        <div className="Demo__container">
          <Header />
          <h1>{postData.contentTitle}</h1>
          {postData.contentLink}<br/>
          {postData.contentTag}<br/>
          {postData.contentDescription}
          <div className="Demo__some-network">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="Demo__some-network__share-button">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>

            <FacebookShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </FacebookShareCount>
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

            <div className="Demo__some-network__share-count">
              &nbsp;
            </div>
          </div>

          <div className="Demo__some-network">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="Demo__some-network__share-button">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <div className="Demo__some-network__share-count">
              &nbsp;
            </div>
          </div>

          <div className="Demo__some-network">
            <GooglePlusShareButton
              url={shareUrl}
              className="Demo__some-network__share-button">
            <GooglePlusIcon
              size={32}
              round />
            </GooglePlusShareButton>

            <GooglePlusShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </GooglePlusShareCount>
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

            <LinkedinShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </LinkedinShareCount>
          </div>

          <div className="Demo__some-network">
            <PinterestShareButton
              url={shareUrl}
              windowWidth={1000}
              windowHeight={730}
              className="Demo__some-network__share-button">
              <PinterestIcon size={32} round />
            </PinterestShareButton>

            <PinterestShareCount url={shareUrl}
              className="Demo__some-network__share-count" />
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

            <RedditShareCount url={shareUrl}
              className="Demo__some-network__share-count" />
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

            <TumblrShareCount url={shareUrl}
              className="Demo__some-network__share-count" />
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
      );
    }
  }

export default SharePage