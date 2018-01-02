import React, { Component } from 'react'

class SortingDropDown extends Component {
  constructor(props) {
      super(props)
      this.state={
          selectedField: 'time_down'
      }
  }

  fieldChange = (e) => {
    e.preventDefault()
    var newSort = e.target.value
    this.setState({selectedField:newSort})
    if (newSort === 'hotness_down') {
      this.props.sortPosts('hotness', 'down')
    } else if (newSort === 'hotness_up') {
      this.props.sortPosts('hotness', 'up')

    } else if (newSort === 'time_down') {
      this.props.sortPosts('dateSubmitted', 'down')
    } else if (newSort === 'time_up') {
      this.props.sortPosts('dateSubmitted', 'up')

    } else if (newSort === 'score_down') {
      this.props.sortPosts('score', 'down')
    } else if (newSort === 'score_up') {
      this.props.sortPosts('score', 'up')
    }
  }

  render() {
    return (
      <div>
        <select value={this.state.selectedField} onChange={this.fieldChange}>

          <option value="time_down">Time Submitted: Newest First</option>
          <option value="time_up">Time Submitted: Oldest First</option>
          <option value="score_down">Score: Descending</option>
          <option value="score_up">Score: Ascending</option>
        </select>
      </div>
    )
  }
}

          // <option value="hotness_down">Hotness: Descending</option>
          // <option value="hotness_up">Hotness: Ascending</option>

export default SortingDropDown