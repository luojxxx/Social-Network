import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const Login = (props) => {
  return (
    <div>
      <a href='http://localhost:3000/auth/google/'>
      <button> Google Login </button>
      </a>
    </div>
)}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Login