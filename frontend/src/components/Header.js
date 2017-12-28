import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import MenuBar from '../containers/MenuBarContainer.js';
import PostBox from '../components/PostBox.js';

const Header = (props) => {
  return (
    <div className="header w-container">
      <div className="heading-inner w-row">
        <div className="site-logo-title w-col w-col-4">
          <Link to='/'>
            <img src="https://d3e54v103j8qbb.cloudfront.net/img/image-placeholder.svg" width="79" />
          </Link>
          <Link to='/'>
            <h1 className="heading">GEDDIT</h1>
          </Link>
        </div>
        <MenuBar />
      </div>
      {props.showPostBoxId==='frontPage'? 
      <PostBox newPost={props.newPost} parent='' /> : ''}
    </div>
)}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Header