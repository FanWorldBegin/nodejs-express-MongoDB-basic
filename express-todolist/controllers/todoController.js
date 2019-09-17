
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://erica:qwe123@todos-2epmm.mongodb.net/test?retryWrites=true&w=majority');

//Schema： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
//模板规定类型
var todoSchema = new mongoose.Schema({
  item: String
});

//model 使用模板todoSchema -- 表
var Todo = mongoose.model('Todo', todoSchema);

// //添加一条数据
// var itemOne = Todo({
//   item: 'buy flowers'
// }).save(function (err) {
//   if (err) throw err;
//   console.log('item saved');
// });


var data = [{
  item: 'get milk'
}, {
  item: "walk dog"
}, {
  item: 'kick some coding ass'
}];

module.exports = function (app) {
  // 请求列表路由
  app.get('/todo', function (req, res) {
    //从数据库中取出所有数据
    Todo.find({}, function(err,  data){
      if(err) throw err;
          res.render('todo', {
            todos: data
          });
    })

  });
  //新增项目路由
  app.post('/todo', urlencodedParser, function (req, res) {
    var itemOne = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  //删除项目路由
  app.delete('/todo/:item', function (req, res) {
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    //货获取到删除的项目  req.params.item 
    console.log(req.params)
    Todo.find({
      item: req.params.item.replace(/-/g, " ")
    }).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
}