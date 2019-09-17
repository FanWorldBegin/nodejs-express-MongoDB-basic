var express = require('express');
var bodyParser = require('body-parser')

var app = express();

//app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
//中间件
//app.use(bodyParser.json())

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

app.post('/', urlencodedParser, function(req, res) {

  //因为使用了中间件 urlencoded 会自己解析body
  console.dir(req.body);
  res.send('ok')
})

//是upload 路径图就解析json
app.post('/upload', jsonParser, function (req, res) {

  //因为使用了中间件 urlencoded 会自己解析body
  console.dir(req.body);
  res.send('ok')
})
app.listen(3000);
console.log('listening to port 3000');