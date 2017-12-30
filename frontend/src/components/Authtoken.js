import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'

const Authtoken = (props) => {
  localStorage.setItem('token', props.location.query.token)
  browserHistory.replace('/')
  return null
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default Authtoken