const express        = require('express');
const cors           = require('cors');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

MongoClient.connect(db.url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log(err)
    require('./app/routes')(app, client.db('memory-cards'));
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
})