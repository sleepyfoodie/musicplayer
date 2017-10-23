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
        results: [null,null,null,null,null]
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


function loadData(data){
    for(let x=0; x<data.links.length; x++) {
        request(data.links[x], function (error, response, body) {
            var $ = cheerio.load(body),
                quotes = $(".quoteText"); 
                quotes.each(function (i, title) {
                    data.results[x]=($(title).text());
                })//end quotes
        }).then( (result) => {
            console.log(urlArray.results[x], 'hello');
        }).catch( (err) => {
            console.log(err); 
        })
    }//end for loop
}
loadData(urlArray);



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