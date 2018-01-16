import { connect } from 'react-redux'
import { search } from '../actions'
import SearchResults from '../components/SearchResults'

const mapStateToProps = (state, ownProps) => ({
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