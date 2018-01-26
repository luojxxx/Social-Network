import { connect } from 'react-redux'
import { loadUserData } from '../actions/pageActions'
import App from '../components/App'

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
)(App)
