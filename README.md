# nodejs-express-MongoDB-basic 学习

## 1.安装
npm install express --save

## 2.请求和相应
```javascript
app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})
```
## 3.路由参数
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/1.png)

有冒号的部分是动态的。其余固定
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/2.png)

## 4 查询字符串
使用req.query取出来就好

4.js
```javascript
var express = require('express');

var app = express();

app.get('/', function(req, res) {
    console.dir(req.query);
    res.send("home page: " + req.query.find);
});

app.get('/profile/:id/user/:name', function(req, res) {
    console.dir(req.params);
    res.send("You requested to see a profile with the name of " + req.params.name);
});

app.get('/ab?cd', function(req, res) {
    res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');
```
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/3.png)

## 5 POST 请求 和 Postman 工具
5.js
```javascript
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
```
### 1. 使用工具库bodyParser
npm install body-parser --save
### 2. 模拟表单请求，或者使用工具postman
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/5.png)
 格式form-data 可以上传文件， x-www-form-urlencodded 不可以上传文件，对特殊字符进行编码
模拟发送请求
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/6.png)
终端收到
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/7.png)
### 3. 中间件的使用，在新请求和响应之间 urkencoded  只处理字符串的
```javascript
app.use(bodyParser.urlencoded({extended: false}));
```
### 4. 如何处理json
使用中间件
 app.use(bodyParser.json())
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/4.png)

![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/8.png)

### 5. 使用路径区分请求格式
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/9.png)

![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/10.png)

## 6.上传文件
### 6.js
```javascript
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
```
### 6.form.html
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<body>
  <form action="/upload" method="post" enctype="multipart/form-data">
    <h2>单图上传</h2>
    <input type="file" name="logo">
    <input type="submit" value="提交">
  </form>
</body>

</html>
```

把文件上传到服务器中 
 enctype="multipart/form-data" 使用form-data格式来处理数据 可以上传文件
 ### 1. 读取表单使用流知识
```javascript
var fs = require('fs');

app.get('/form', function (req, res) {
  var form = fs.readFileSync('./form.html', {
    encoding: "utf8"
  });
  res.send(form);
});

```
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/11.png)
form action="/upload" 
点击提交到upload 路由下

## 2. 使用一个新的库multer 处理文件上传
upload.single('logo') 名字为input的name
```javascript
var multer = require('multer')

// 指定上传目录，当前目录下的uploads
var upload = multer({
  dest: 'uploads/'
})


app.post('/upload', upload.single('logo'), function (req, res) {
  console.dir(req.file);
  res.send({
    'ret_code': 0
  });
});
```
点击提交发现创建文件夹，上传成功
![image](https://github.com/FanWorldBegin/nodejs-express-MongoDB-basic/blob/master/images/11.png)