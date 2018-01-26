import { connect } from 'react-redux'
import { search } from '../actions/pageActions'
import SearchResults from '../components/SearchResults'

const mapStateToProps = (state, ownProps) => ({
  pageLoading: state.displayState.pageLoading
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  search: (searchQuery, page) => {
    dispatch(search(searchQuery, page))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults)