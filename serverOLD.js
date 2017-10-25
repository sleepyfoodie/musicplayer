const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request');
cheerio = require("cheerio"),


    urlArray = {
        links: [
            "https://www.goodreads.com/quotes/tag/happiness",
            "https://www.goodreads.com/quotes/tag/sadness",
            "https://www.goodreads.com/quotes/tag/surprise",
            "https://www.goodreads.com/quotes/tag/anger",
            "https://www.goodreads.com/quotes/tag/fear"
        ],
        results: [null, null, null, null, null]
    }



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
var request = require("request-promise"),
    cheerio = require("cheerio"),

    urlArray = {
        "joy": "https://www.goodreads.com/quotes/tag/happiness",
        "sadness": "https://www.goodreads.com/quotes/tag/sadness",
        "surprise": "https://www.goodreads.com/quotes/tag/surprise",
        "anger": "https://www.goodreads.com/quotes/tag/anger",
        "fear": "https://www.goodreads.com/quotes/tag/fear"
    }

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//web scraping. based on which emotion the api returns, it will grab a collection of quotes scraped from the site 
app.get('/quote', (req, res) => {
    var options = {
        uri: 'http://www.google.com',
        transform: function (body) {
            return cheerio.load(body);
        }
    };


    //request-promise way - Will
    rp(options)
        .then(function ($) {
            var titles = $(".quoteText");
            var titlesArray = titles.map(function (i, title) {
                return JSON.stringify({ 'data': ($(title).text()) })
            })
            res.send(titlesArray)
        })
        .catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log(err)
        });

    //request way - Will
    request("https://www.goodreads.com/quotes/tag/fear", function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                titles = $(".quoteText");
            var titlesArray = titles.map(function (i, title) {
                return JSON.stringify({ 'data': ($(title).text()) })
            })
            res.send(titlesArray)
        } else {
            res.send(404)
            console.log("Cheerio error: " + error);
        }
    })

});





app.post('/text', (req, res) => {
    console.log(req.body)
    let url = "https://apiv2.indico.io/emotion";
    axios.post(
        'https://apiv2.indico.io/emotion',
        JSON.stringify({
            'api_key': "64cb9e95d8040578512022fd5601c695",
            'data': req.body.data,
            'threshold': 0.1
        })
    ).then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
            console.log(err);
        });
})



app.listen(8081, () => {
    console.log('Server is running on 8081');
})