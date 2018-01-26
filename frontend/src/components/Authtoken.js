import { browserHistory } from 'react-router'

const Authtoken = (props) => {
  localStorage.setItem('token', props.location.query.token)
  props.loadUserData()
  browserHistory.replace('/')
  return null
}

export default Authtoken