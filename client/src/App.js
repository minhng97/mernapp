import React, { Component } from 'react';
import axios from 'axios'

import './App.css'

class App extends Component {
  state = {
    title: '',
    body: '',
    posts: []
  }

  componentDidMount() {
    this.getBlogPost()
  }

  getBlogPost = () => {
    // Get posts from database
    axios.get('/api')
      .then(({ data }) => {
        // Deep copy
        const reverseData = [];
        for (let i = data.length - 1; i >= 0; i--) {
          reverseData.push(data[i]);
        }

        this.setState({
          posts: reverseData
        })

      })
      .catch((error) => {
        alert('Error: ', error)
      })
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value
    })
  }

  submit = (event) => {
    event.preventDefault()

    const payload = {
      title: this.state.title,
      body: this.state.body
    }
    // Save item to database
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('data has been sent to server');
        this.resetUserInput();
        this.getBlogPost(); // set state
      })
      .catch(() => console.log('500 internal error'))
  }

  resetUserInput = () => {
    this.setState({
      title: "",
      body: ""
    });
  }

  displayBlogPost = (posts) => {

    if (!posts.length) return null;

    return posts.map(post => <li
      className="blog-post__display">
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </li>
    )
  }

  render() {
    //JSX
    return (
      <div className="app">

        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="posts">
          <ul>
            {this.displayBlogPost(this.state.posts)}
          </ul>
        </div>


      </div>
    )
  }

}

export default App;
