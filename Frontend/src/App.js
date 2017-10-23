import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';


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
  }

  //callback function inside playthis(), this sends a post request to server for web scraping
  callQuote() {
    const promise = axios.post('http://localhost:8080/quote', {
      "feeling": this.state.feeling
    });
    promise.then((result) => {
      let quotes = result.data.titles;
      let index = Math.floor((Math.random() * quotes.length));
      console.log(quotes[index])
    });
    promise.catch((error) => {
      console.log(error);
    })
  }

  //this setstates the music playlist based on emotion that was returned, callback function from submit()
  playthis() {
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
        // quote: urlArray.results[3]
      }, ()=> this.callQuote() )
    }
    else if (this.state.feeling === "joy") {
      this.setState({
        musicListA: playList.joy[0],
        musicListB: playList.joy[1],
        musicListC: playList.joy[2],
        // quote: urlArray.results[0]
      }, ()=> this.callQuote() )
    }
    else if (this.state.feeling === "fear") {
      this.setState({
        musicListA: playList.fear[0],
        musicListB: playList.fear[1],
        musicListC: playList.fear[2],
        // quote: urlArray.results[4]
      }, ()=> this.callQuote() )
    }
    else if (this.state.feeling === "surprise") {
      this.setState({
        musicListA: playList.surprise[0],
        musicListB: playList.surprise[1],
        musicListC: playList.surprise[2],
        // quote: urlArray.results[2]
      }, ()=> this.callQuote() )
    }
    else {
      this.setState({
        musicListA: playList.sadness[0],
        musicListB: playList.sadness[1],
        musicListC: playList.sadness[2],
        // quote: urlArray.results[1]
      }, ()=> this.callQuote() )
    }
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
  this.setState ({
    feeling: "joy"
  }, ()=>this.playthis())
}
else {
  this.setState ({
    feeling: "surprise"
  }, ()=>this.playthis())
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
          emotion={this.state.feeling} />
        <Playlist 
          musicListA={this.state.musicListA} 
          musicListB={this.state.musicListB} 
          musicListC={this.state.musicListC}
          feeling={this.state.feeling} />
        <QuoteArea
          quote={this.state.quote} />
      </div>
    )
  }
}

//This component holds the box where user enters a string of text and submit it into an API for lexical analytics.
function Emotion(props) {
  return (
    <div>
      <h1> Enter a string of text </h1>
      <form onSubmit={(e) => { props.submit(e) }} type="submit">
        <textarea
          id="emotion"
          required
          value={props.emotion}
          onChange={(e) => { props.onChange(e) }}>
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

//This component holds Spotify suggestion:
function Playlist(props) {
  return (
    <div id={(props.feeling==="")? "block" : ""}>
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


    </div>
  )
}

function QuoteArea(props) {
  return(
    <div>
      {props.quote}
    </div>
  )
}

export default App;