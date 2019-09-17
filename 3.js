var express = require('express');

var app = express();

//:id 意思是变化的id 
app.get('/profile/:id/user/:name', function (req, res) {
  console.dir(req.params); //终端输出
  res.send("You requested to see a profile with the name of " + req.params.name);
});

//正则表达式写路由  ？ 前的字符可以出现0次或1次
app.get('/ab?cd', function (req, res) {
  res.send('/ab?cd');
})

app.listen(3000);
console.log('listening to port 3000');