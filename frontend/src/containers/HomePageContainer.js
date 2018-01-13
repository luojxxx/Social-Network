import { connect } from 'react-redux'
import { loadFrontPageData } from '../actions'
import HomePage from '../components/HomePage'

const mapStateToProps = (state, ownProps) => ({
  displayedPosts: state.displayedPosts
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