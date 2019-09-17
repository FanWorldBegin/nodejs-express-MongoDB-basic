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
![image](https://github.com/FanWorldBegin/nodejs-basic/blob/master/images/1.png)