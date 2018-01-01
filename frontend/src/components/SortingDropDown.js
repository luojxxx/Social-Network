import React, { Component } from 'react'

class SortingDropDown extends Component {
  constructor(props) {
      super(props)
      this.state={
          selectedField: 'score_down'
      }
  }

  fieldChange = (e) => {
    e.preventDefault()
    this.setState({selectedField:e.target.value})
  }

  render() {
    return (
      <div>
        <select value={this.state.selectedField} onChange={this.fieldChange}>
          <option value="hotness_down">Hotness: Descending</option>
          <option value="hotness_up">Hotness: Ascending</option>
          <option value="time_down">Time Submitted: Descending</option>
          <option value="time_up">Time Submitted: Ascending</option>
          <option value="score_down">Score: Descending</option>
          <option value="score_up">Score: Ascending</option>
        </select>
      </div>
    )
  }
}

export default SortingDropDown