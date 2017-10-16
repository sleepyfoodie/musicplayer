const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/text', (req, res) => {
    console.log('pulled from postman', req.body)
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


app.listen(8080, () => {
    console.log('Server is running on 8080');
})