var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');

//使用静态文件
app.use(express.static('./public'));

//将app 传入
todoController(app);

app.listen(3000);

console.log('You are listening to port 3000');