import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      emotion: "",
      feeling: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.id;
    this.setState({
      [name]: value
    })
  }
  submit(e) {
    e.preventDefault()
    const promise = axios.post('http://localhost:8080/text', {
      "api_key": "64cb9e95d8040578512022fd5601c695",
      "data": this.state.emotion,
      "threshold": 0.1
    });
    promise.then((result) => {
      console.log(result.data.results);
      var emotions = result.data.results;
      var emotion;
      Object.keys(emotions).reduce(function(a,b) {
        return emotion = emotions[a] > emotions[b] ? a : b
      })
      this.setState({
        feeling: emotion,
        emotion: ""
      })
    });
    promise.catch((error) => {
      console.log(error);
    })
  }
  render() {
    return (
      <div>
        <Emotion emotion={this.state.emotion} onChange={this.handleChange} submit={this.submit}/>
        <Feeling emotion={this.state.feeling}/>
      </div>
    )
  }
}

//This component holds the box where user enters a string of text and submit it into an API for lexical analytics.
function Emotion(props) {
  return (
    <div>
      <form onSubmit={(e) => {props.submit(e)} } type="submit">
        <textarea
          id="emotion"
          required
          value={props.emotion}
          onChange={(e) => {props.onChange(e)} }>
        </textarea>
        <button onClick={props.submit}>enter</button>
      </form>
    </div>
  )
}

//This component shows what the user is feeling
function Feeling(props) {
  return (
    <div>
      You are feeling: {props.emotion}
    </div>
  )
}

export default App;