var fs = require('fs');

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var comments = [{author: 'Rav', text: 'I like stuff'}];

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.get('/comments.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/comments.json', function(req, res) {
  comments.push(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.listen(3000);