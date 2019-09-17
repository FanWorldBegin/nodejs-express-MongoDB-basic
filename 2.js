var express = require('express');

var app = express();

app.get('/', function (req, res) {
  var responseObject = req.method;
  res.send(responseObject);
});

//监听在端口上
app.listen(3000);
console.log('listening to port 3000');