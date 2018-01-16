import { connect } from 'react-redux'
import Pagination from '../components/Pagination'

const mapStateToProps = (state, ownProps) => ({
  pages: state.displayedPosts.pages
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination)