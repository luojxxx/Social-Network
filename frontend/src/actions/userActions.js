import axios from 'axios'
import { apiUrl } from '../config'

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
      }
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateUserName = (userName) => ({
  type: 'UPDATE_USER_NAME',
  payload: userName
})
