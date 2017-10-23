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
let titleResults = [];
let counter = 0;
app.post('/quote', (req, res) => {
    console.log(req.body, 'i get called')
    if (req.body === "joy") {
        url = urlArray.joy
    }
    else if (req.body === "sadness") {
        url = urlArray.sadness
    }
    else if (req.body === "surprise") {
        url = urlArray.surprise
    }
    else if (req.body === "anger") {
        url = urlArray.anger
    }
    else {
        url = urlArray.fear
    }
    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                titles = $(".quoteText");
            titles.each(function (i, title) {
                titleResults[i] = JSON.stringify({
                    'data': ($(title).text())
                })
                counter++;
                if (counter === titles.length) {
                    res.send({ titles: titleResults });
                    console.log({titles: titleResults[0]})
                }
            })
        } else {
            console.log("Cheerio error: " + error);
        }
    })
        .catch((err) => {
            console.log(err, 'in sending data');
        });

});

//api to retrieve emotion based on words entered into a textfield. 
app.post('/text', (req, res) => {
    console.log(req.body)
    let url = "https://apiv2.indico.io/emotion";
    axios.post(
        'https://apiv2.indico.io/emotion',
        JSON.stringify({
            'api_key': "64cb9e95d8040578512022fd5601c695",
            'data': req.body.data, //string of words
            'threshold': 0.1 //it's suppose to return only 1 emotion
        })
    ).then((response) => {
        res.send(response.data);
    })
        .catch((err) => {
            console.log(err);
        });
})



app.listen(8080, () => {
    console.log('Server is running on 8080');
})