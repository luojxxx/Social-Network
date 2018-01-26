import { connect } from 'react-redux'
import { loadUserData } from '../actions/pageActions'
import Authtoken from '../components/Authtoken'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUserData: () => {
    dispatch(loadUserData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authtoken)
