import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
var smoothScroll = require('smoothscroll');

//main component, where all functions and states are
class App extends Component {
  constructor() {
    super()
    this.state = {
      emotion: "",
      feeling: "",
      musicListA: "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DX3PIPIT6lEg5",
      musicListB: "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DX1s9knjP51Oa",
      musicListC: "https://embed.spotify.com/?uri=spotify%3Auser%3Adaviestown%3Aplaylist%3A6lQQ5SXULv5I7yM95Wo5Dm",
      quote: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.playthis = this.playthis.bind(this)
    this.callQuote = this.callQuote.bind(this)
    this.toMusic = this.toMusic.bind(this)
    this.toQuote = this.toQuote.bind(this)
    this.toHome = this.toHome.bind(this)
  }

  //to top
  toHome() {
    window.scrollTo(0,0);
    this.setState({
      emotion: "",
      feeling: ""
    })
  }
  //to scroll to Quote
  toQuote() {
    if (this.state.feeling == "joy") {
      smoothScroll(document.querySelector('#JoyQ'))
    }
    else if (this.state.feeling == "surprise") {
      smoothScroll(document.querySelector('#SurpriseQ'))
    }
    else if (this.state.feeling == "sadness") {
      smoothScroll(document.querySelector("#SadnessQ"))
    }
    else if (this.state.feeling == "fear") {
      smoothScroll(document.querySelector("#FearQ"))
    }
    else {
      smoothScroll(document.querySelector("#AngerQ"))
    }
  }
  //to scroll to Spotify Playlist
  toMusic() {
    smoothScroll(document.querySelector('#Playlist'));
  }
  //callback function inside playthis(), this sends a post request to server for web scraping
  callQuote() {
    const promise = axios.post('http://localhost:8080/quote', {
      "feeling": this.state.feeling
    });
    promise.then((result) => {
      let quotes = result.data.titles;
      let index = Math.floor((Math.random() * quotes.length));
      this.setState({
        quote: quotes[index]
      })
      console.log(quotes)
    });
    promise.catch((error) => {
      console.log(error);
    })
  }

  //this setstates the music playlist based on emotion that was returned, callback function from submit()
  playthis() {
    if (this.state.feeling == "joy") {
      smoothScroll(document.querySelector('#Joy'))
    }
    else if (this.state.feeling == "surprise") {
      smoothScroll(document.querySelector('#Surprise'))
    }
    else if (this.state.feeling == "sadness") {
      smoothScroll(document.querySelector("#Sadness"))
    }
    else if (this.state.feeling == "fear") {
      smoothScroll(document.querySelector("#Fear"))
    }
    else {
      smoothScroll(document.querySelector("#Anger"))
    }
    const playList = {
      "anger": [
        "https://embed.spotify.com/?uri=spotify%3Auser%3Alenalynn2222%3Aplaylist%3A6SO62h8wlSqf7YS5tIIabJ",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Avheist16%3Aplaylist%3A0jFTAWnKeif1jeycmfzntA",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Akerwino%3Aplaylist%3A4mCGD3C9QXhrWv3uBIpbRF"
      ],
      "joy": [
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DWSkMjlBZAZ07",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DWVlYsZJXqdym",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DXdPec7aLTmlC"
      ],
      "surprise": [
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DX4IDaXtVjL83",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Acaciafrickingbrinley%3Aplaylist%3A51Ca05x9QkTaA63dg4NWyP",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Abgreen2885%3Aplaylist%3A5WliFKFTqhNdQupuTK6zMi"
      ],
      "sadness":
      ["https://embed.spotify.com/?uri=spotify%3Auser%3Adoddleoddle%3Aplaylist%3A6HqkpSVL58RuH1lczr8yVz",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Acalfreezy%3Aplaylist%3A1a7ZGpS7Ugpees7e7eP6My",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Alovsethgirl%3Aplaylist%3A5xV6rLSQeIVchJVPT9H7sX"
      ],
      "fear": [
        "https://embed.spotify.com/?uri=spotify%3Auser%3Anickfearless%3Aplaylist%3A6EF56fuiUgN2GOMVZIiXpq",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aardengard%3Aplaylist%3A5Ryp1G66sjS1S1ZYLTmrQw",
        "https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify%3Aplaylist%3A37i9dQZF1DZ06evO2rEeYg"
      ]
    }
    if (this.state.feeling === "anger") {
      this.setState({
        musicListA: playList.anger[0],
        musicListB: playList.anger[1],
        musicListC: playList.anger[2],
      }, () => this.callQuote())
    }
    else if (this.state.feeling === "joy") {
      this.setState({
        musicListA: playList.joy[0],
        musicListB: playList.joy[1],
        musicListC: playList.joy[2],
      }, () => this.callQuote())
    }
    else if (this.state.feeling === "fear") {
      this.setState({
        musicListA: playList.fear[0],
        musicListB: playList.fear[1],
        musicListC: playList.fear[2],
      }, () => this.callQuote())
    }
    else if (this.state.feeling === "surprise") {
      this.setState({
        musicListA: playList.surprise[0],
        musicListB: playList.surprise[1],
        musicListC: playList.surprise[2],
      }, () => this.callQuote())
    }
    else {
      this.setState({
        musicListA: playList.sadness[0],
        musicListB: playList.sadness[1],
        musicListC: playList.sadness[2],
      }, () => this.callQuote())
    }
  }

  //Takes the new value from textfield and resets state
  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.id;
    this.setState({
      [name]: value
    })
  }

  //Submit Button Function
  submit(e) {
    // window.scrollTo(80, document.body.scrollHeight);
    e.preventDefault()

    //this section is commented out for now. this.state.emotion is hard coded with "joy" or "surprise" for now to prevent API calls,
    //since there is a limit to number of API calls/month

    // const promise = axios.post('http://localhost:8080/text', {
    //   "api_key": "64cb9e95d8040578512022fd5601c695",
    //   "data": this.state.emotion,
    //   "threshold": 0.1
    // });
    // promise.then((result) => {
    //   console.log(result.data.results);
    //   var emotions = result.data.results;
    //   var emotion;
    //   Object.keys(emotions).reduce(function (a, b) {
    //     return emotion = emotions[a] > emotions[b] ? a : b
    //   })
    //   this.setState({
    //     feeling: emotion,
    //     emotion: ""
    //   }, () => this.playthis())
    // });
    // promise.catch((error) => {
    //   console.log(error);
    // })

    if (this.state.emotion.length > 5) {
      this.setState({
        feeling: "joy"
      }, () => this.playthis())
    }
    else {
      this.setState({
        feeling: "surprise"
      }, () => this.playthis())
    }
  }


  render() {
    return (
      <div>

        <Emotion
          emotion={this.state.emotion}
          onChange={this.handleChange}
          submit={this.submit} />
        <Feeling
          emotion={this.state.feeling}
          toMusic={this.toMusic} />
        <Playlist
          musicListA={this.state.musicListA}
          musicListB={this.state.musicListB}
          musicListC={this.state.musicListC}
          feeling={this.state.feeling}
          toQuote={this.toQuote} />
        <QuoteArea
          quote={this.state.quote}
          emotion={this.state.feeling}
          tohome={this.toHome} />
      </div>
    )
  }
}

//This component holds the box where user enters a string of text and submit it into an API for lexical analytics.
function Emotion(props) {
  return (
    <div className="Emotion">
      <div id="wrap">
        <h1>
          <span>E</span>
          <span>n</span>
          <span>t</span>
          <span>e</span>
          <span>r</span>
          <div id="words"></div>
          <span>w</span>
          <span>o</span>
          <span>r</span>
          <span>d</span>
          <span>s</span>
          <div id="words"></div>
          <span>i</span>
          <span>n</span>
          <div id="words"></div>
          <span>h</span>
          <span>e</span>
          <span>r</span>
          <span>e</span>
        </h1>
        <p></p>
        <form onSubmit={(e) => { props.submit(e) }} type="submit">
          <textarea
            id="emotion"
            required
            value={props.emotion}
            onChange={(e) => { props.onChange(e) }}>
          </textarea>
          <p></p>
          <button
            id="button"
            onClick={props.submit}>SUBMIT
          </button>
        </form>
      </div>
    </div>
  )
}

//This component shows what the user is feeling
function Feeling(props) {
  return (
    <div id={(props.emotion == "joy") ? "Joy" :
      ((props.emotion == "surprise") ? "Surprise" :
        ((props.emotion == "sadness") ? "Sadness" :
          ((props.emotion == "anger") ? "Anger" :
            ((props.emotion == "fear") ? "Fear" : "block"))))}>
      <div className="feeling">
        <h1>Based on your texts...</h1>
        <h1>You are feeling ... <i>{props.emotion}</i></h1>
        <button
          id="feel"
          onClick={props.toMusic}
        >Next</button>
      </div>
    </div>
  )
}

//This component holds Spotify suggestion:
function Playlist(props) {
  return (
    <div id={(props.feeling === "") ? "block" : "Playlist"}>
      <h1>Here are some playlists for {props.feeling}</h1>
      <Row>
        <Col id="playlist" xs={12} sm={4} md={4}>
          <iframe
            src={props.musicListA}
            title="A"
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true">
          </iframe>
        </Col>
        <Col id="playlist" xs={12} sm={4} md={4}>
          <iframe
            src={props.musicListB}
            title="B"
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true">
          </iframe>
        </Col>
        <Col id="playlist" xs={12} sm={4} md={4}>
          <iframe
            src={props.musicListC}
            title="C"
            width="300"
            height="380"
            frameborder="0"
            allowtransparency="true">
          </iframe>
        </Col>
      </Row>
      <p></p>
      <button
        id="toquote"
        onClick={props.toQuote}>
        Next
        </button>


    </div>
  )
}

//This component spits out a quote for users depending on what emotion the API gives them
function QuoteArea(props) {
  return (
    <div id={(props.emotion == "joy") ? "JoyQ" :
      ((props.emotion == "surprise") ? "SurpriseQ" :
        ((props.emotion == "sadness") ? "SadnessQ" :
          ((props.emotion == "anger") ? "AngerQ" :
            ((props.emotion == "fear") ? "FearQ" : "block"))))}>
      <h1>{props.quote}</h1>
      <p></p>
      <button id="toquote" onClick={props.tohome}>Again</button>
    </div>
  )
}

export default App;