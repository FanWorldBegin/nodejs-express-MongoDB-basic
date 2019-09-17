var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var multer = require('multer');

//检查是否有文件夹
var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    //没有的话创建目录
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';

//将目录传给创建函数
createFolder(uploadFolder);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})

app.get('/', function (req, res) {
  console.dir(req.query);
  res.send("home page: " + req.query.find);
});

app.get('/form', function (req, res) {
  var form = fs.readFileSync('./6.form.html', {
    encoding: "utf8"
  });
  res.send(form);
});

app.post('/', urlencodedParser, function (req, res) {
  console.dir(req.body);
  res.send(req.body.name);
});

app.post('/upload', upload.single('logo'), function (req, res) {
  console.dir(req.file);
  res.send({
    'ret_code': 0
  });
});

app.get('/profile/:id/user/:name', function (req, res) {
  console.dir(req.params);
  res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', function (req, res) {
  res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');