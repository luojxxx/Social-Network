import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const Header = (props) => {
  return (
    <div className="header w-container">
      <div className="heading-inner w-row">
        <div className="site-logo-title w-col w-col-4">
          <img src="https://d3e54v103j8qbb.cloudfront.net/img/image-placeholder.svg" width="79" />
          <h1 className="heading">GEDDIT</h1>
        </div>
        <div className="username-options w-col w-col-8">
          <a href="#" className="w-button">Username</a>
          <a href='http://localhost:3000/auth/google/' className="w-button">Login/Out</a>
        </div>
      </div>
    </div>
)}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Header