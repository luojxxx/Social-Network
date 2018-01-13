import { browserHistory } from 'react-router'

const Authtoken = (props) => {
  localStorage.setItem('token', props.location.query.token)
  browserHistory.replace('/')
  return null
}

export default Authtoken