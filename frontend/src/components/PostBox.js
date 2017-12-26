import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PostBox extends Component{
  constructor(props) {
      super(props);
      this.state={
          contentTitle: '',
          contentTag: '',
          contentLink: '',
          contentDescription: '',
      };
      this.submitPost = this.submitPost.bind(this);
  }

  updateTitleField(e){
    this.setState({contentTitle: e.target.value})
  }

  updateTagField(e){
    this.setState({contentTag: e.target.value})
  }

  updateLinkField(e){
    this.setState({contentLink: e.target.value})
  }

  updateDescriptionField(e){
    this.setState({contentDescription: e.target.value})
  }

  submitPost(e){
    var data = Object.assign({}, this.state, this.props.parent)
    this.props.newPost(data);
  }

  render() {
    return (
      <div className="newpost w-container">
        <div className="w-row">
          <div className="w-col w-col-9">
            <label htmlFor="Title">Title</label>
            <input 
            onChange={(evt)=>{this.updateTitleField(evt)}}
            type="text" 
            className="w-input" 
            maxLength="256" 
            autoFocus="true" 
            name="Title" 
            data-name="Title" 
            id="Title" 
            required="" />
          </div>
          <div className="w-col w-col-3">
            <label htmlFor="tag">Tag</label>
            <input 
            onChange={(evt)=>{this.updateTagField(evt)}}
            type="text" 
            className="w-input" 
            maxLength="256" 
            name="tag" 
            data-name="tag" 
            id="tag" />
          </div>
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input 
          onChange={(evt)=>{this.updateLinkField(evt)}}
          type="text" 
          className="w-input" 
          maxLength="256" 
          name="link" 
          data-name="link" 
          id="link" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
          onChange={(evt)=>{this.updateDescriptionField(evt)}}
          id="description" 
          name="description" 
          maxLength="5000" 
          data-name="description" 
          className="w-input"></textarea>
        </div>
        <div>
          <a href="#" onClick={this.submitPost} className="w-button">Submit</a>
        </div>
      </div>
      )}
}

// Todo.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   completed: PropTypes.bool.isRequired,
//   text: PropTypes.string.isRequired
// }

export default PostBox;