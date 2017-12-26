import React, {Component} from 'react'
import PropTypes from 'prop-types'

class NewPost extends Component{
  render() {
    return (
      <div class="newpost w-container">
        <div class="w-row">
          <div class="w-col w-col-9">
            <label for="Title">Title</label>
            <input type="text" class="w-input" maxlength="256" autofocus="true" name="Title" data-name="Title" id="Title" required="" />
          </div>
          <div class="w-col w-col-3">
            <label for="tag">Tag</label>
            <input type="text" class="w-input" maxlength="256" name="tag" data-name="tag" id="tag" />
          </div>
        </div>
        <div>
          <label for="link">Link</label>
          <input type="text" class="w-input" maxlength="256" name="link" data-name="link" id="link" />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description" name="description" maxlength="5000" data-name="description" class="w-input"></textarea>
        </div>
        <div>
          <a href="#" class="w-button">Submit</a>
        </div>
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default NewPost;