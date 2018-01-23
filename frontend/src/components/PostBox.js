import React, {Component} from 'react'

class PostBox extends Component{
  constructor(props) {
      super(props)
      this.state={
          contentTitle: props.post.contentTitle,
          contentTag: props.post.contentTag,
          contentLink: props.post.contentLink,
          contentDescription: props.post.contentDescription,
      }
  }

  updateTitleField = (e) => {
    this.setState({contentTitle: e.target.value})
  }

  updateTagField = (e) => {
    this.setState({contentTag: e.target.value})
  }

  updateLinkField = (e) => {
    this.setState({contentLink: e.target.value})
  }

  updateDescriptionField = (e) => {
    this.setState({contentDescription: e.target.value})
  }

  submitPost = (e)=>{
    e.preventDefault()
    var data = Object.assign({}, this.state, {parent:this.props.parent})
    if (this.props.newOrEdit==='new'){
      this.props.newPost(data)
    }
    if (this.props.newOrEdit==='edit'){
      this.props.editPost(this.props.post._id, data)
    }
  }

  render() {
    return (
      <div className="newpost w-container">
        <div className="w-row">
          <div className="w-col w-col-9">
            <label htmlFor="Title">Title</label>
            <input 
            onChange={this.updateTitleField} 
            value={this.state.contentTitle} 
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
            onChange={this.updateTagField}
            value={this.state.contentTag}
            type="text" 
            className="w-input" 
            maxLength="64" 
            name="tag" 
            data-name="tag" 
            id="tag" />
          </div>
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input 
          onChange={this.updateLinkField}
          value={this.state.contentLink}
          type="text" 
          className="w-input" 
          maxLength="512" 
          name="link" 
          data-name="link" 
          id="link" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
          onChange={this.updateDescriptionField}
          value={this.state.contentDescription}
          id="description" 
          name="description" 
          maxLength="10000" 
          data-name="description" 
          className="w-input"></textarea>
        </div>
        <div>
          <button onClick={this.submitPost} className="w-button">Submit</button>
        </div>
      </div>
      )
  }
}

export default PostBox