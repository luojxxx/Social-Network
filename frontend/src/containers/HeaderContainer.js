import { connect } from 'react-redux'
import { newPost, search } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state, ownProps) => ({
  showPostBoxId: state.displayState.showPostBoxId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  newPost: (data) => {
    dispatch(newPost(data))
  },
  search: (searchQuery) => {
    dispatch(search(searchQuery))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
