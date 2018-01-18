import { connect } from 'react-redux'
import Pagination from '../components/Pagination'

const mapStateToProps = (state, ownProps) => ({
  pages: state.displayState.pages
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination)