import axios from 'axios'
import { apiUrl } from '../config'
import { updateBanner } from './generalActions'

export function changeUserName(userName) {
  return function(dispatch){
    axios({
      method:'put',
      url:apiUrl+'users/changeusername',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {userName: userName}
    })
    .then( (response) => {
      if (response.data.changed === 'true') {
        dispatch(updateUserName(response.data.userName))
        dispatch(updateBanner('Successfully updated Username'))
      } else {
        dispatch(updateBanner('Sorry already taken'))
      }
    })
    .catch( (err) => {
      dispatch(updateBanner('Error - Could not contact server'))
    })
  }
}

export const updateUserName = (userName) => ({
  type: 'UPDATE_USER_NAME',
  payload: userName
})
