import React, {Component} from 'react'
import Textarea from "react-textarea-autosize"
import loadingSpinner from '../images/loadingSpinner.gif'

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

  componentWillReceiveProps(nextProps) {
      if (this.props.pendingPostState === 'pending' && nextProps.pendingPostState === 'success') {
        this.props.closePostBox()
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
    if (this.state.contentTitle !== '') {
      var data = Object.assign({}, this.state, {parent:this.props.parent})
      if (this.props.newOrEdit==='new'){
        this.props.newPost(data)
      }
      if (this.props.newOrEdit==='edit'){
        this.props.editPost(this.props.post._id, data)
      }
    }
  }

  render() {
    return (
      <div className="postFormCol margin_medium">
        <div className="">
          <div className="">
            <label htmlFor="Title">
              Title{' '}
              <span className="greyedOut">(*required)</span>
            </label>
            <Textarea 
              onChange={this.updateTitleField} 
              value={this.state.contentTitle} 
              type="text" 
              className="w-input textAreaNoResizeHandle" 
              maxLength="256" 
              autoFocus="true" />
          </div>
          <div className="">
            <label htmlFor="tag">Tag</label>
            <input 
              onChange={this.updateTagField}
              value={this.state.contentTag}
              type="text" 
              className="w-input" 
              maxLength="64" />
          </div>
        </div>
        <div>
          <label htmlFor="link">Link</label>
          <input 
            onChange={this.updateLinkField}
            value={this.state.contentLink}
            type="text" 
            className="w-input" 
            maxLength="512" />
        </div>
        <div>
          <label htmlFor="description">
            Description{' '}
            <span className="greyedOut">(Markdown supported)</span>
          </label>
          <Textarea 
            onChange={this.updateDescriptionField}
            value={this.state.contentDescription}
            type="text" 
            className="w-input textAreaNoResizeHandle" 
            maxLength="10000" />
        </div>
        <div>
          {(this.props.pendingPostState === 'pending')
            ?<div className='loader'></div>
            :<button onClick={this.submitPost} className="w-button">Submit</button>
          }
        </div>
      </div>
      )
  }
}

export default PostBox