import { connect } from 'react-redux'
import { loadFrontPageData } from '../actions'
import HomePage from '../components/HomePage'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFrontPageData: () => {
    dispatch(loadFrontPageData())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)