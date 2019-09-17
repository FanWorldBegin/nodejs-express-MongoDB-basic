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