import { connect } from 'react-redux'
import { loadFrontPageData } from '../actions/pageActions'
import HomePage from '../components/HomePage'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFrontPageData: (page) => {
    dispatch(loadFrontPageData(page))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)