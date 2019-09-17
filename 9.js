var express = require('express');

var app = express();

//静态文件放在public文件夹中 
//app.use(express.static('public'));
app.use('/assets', express.static('public'));


//中间件
app.use(function (req, res, next) {
  console.log('first middleware');
  next(); //传给下一个中间件，没有next则停在这里
  console.log('first middleware after');
})

app.use('/home', function (req, res, next) {
  console.log('second middleware');
  res.send('ok');
})

app.get('/', function(req, res, next) {
    res.send('ok');
})

app.listen(3000);
console.log('listening to port 3000');