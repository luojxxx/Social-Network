import { connect } from 'react-redux'
import SharePage from '../components/SharePage'

const mapStateToProps = (state, ownProps) => ({
  displayedPostsData: state.displayedPosts.data
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePage)