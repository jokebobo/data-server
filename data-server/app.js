var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');//morgan中间件记录日志
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var piclist = require('./routes/piclist');
var chatlist = require('./routes/chat');
var bodyParser = require('body-parser');//post请求需要借助bodyParser模块
var list = require('./routes/chatlist');
var uppic = require('./routes/uppic');
var app = express();
/* 静态文件中间件 */
app.use(express.static('public'));
app.use(express.static('upload'));
//跨域访问数据cors设置
app.use(cors({
  origin: ['http://localhost:8090', 'http://zt.house365.com', 'http://localhost:3001', 'http://localhost:9000','http://localhost:9090'],//允许这个域的访问
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']//只允许带这两种请求头的访问
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));//打印到控制台
app.use(express.json());//解析JSON格式的get参数
app.use(express.urlencoded({ extended: true }));//解析urlencoeded编码的get参数，URLEncoded编码中,所有的字符均为ANSCII码
app.use('/index', indexRouter);
/* 此项目是通过express-gernerator生成的，在express里面已经直接引入body-parse处理post提交方法的数据 */
/* app.use(bodyParser.json());//解析JSON格式的post参数
app.use(bodyParser.urlencoded({ extended: true }));//解析urlencoeded编码的post参数，URLEncoded编码中,所有的字符均为ANSCII码 */
app.use('/users', usersRouter);
app.use('/pic', piclist);
app.use('/uppic', uppic);
/* app.use('/chatlist', chatlist); */
//async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
app.post('/chatlist', async function (req, res) {
  let id = req.body.id;
  let recobj = null;
  let inpval = "";
  let size = "";
  let page = "";
  if (req.body.recobj) {
    recobj = req.body.recobj;
  }
  if (req.body.inpval) {
    inpval = req.body.inpval;
  }
  if (req.body.size) {
    size = req.body.size;
  }
  if (req.body.page) {
    page = req.body.page;
  }
  if (id != -1) {
    res.send(await chatlist.find().where({ id: id }));
  } else {
    console.log(page);
    res.send(await chatlist.find().limit(size).skip(page * size));
  }

})
app.post('/list', async function (req, res) {
  let id = req.body.id;
  let _id = req.body._id;
  let rel_id = req.body.rel_id;
  let recobj = null;
  let newval = "";
  let newRec = null;
  let size = "";
  let page = "";
  if (req.body.recobj) {
    recobj = req.body.recobj;
  }
  if (req.body.newval) {
    newval = req.body.newval;
  }
  if (req.body.newRec) {
    newRec = req.body.newRec;
  }
  if (req.body.size) {
    size = parseInt(req.body.size);
  }
  if (req.body.page) {
    page = req.body.page;
  }
  let condition = { id: id };

  if (recobj != null && newval != "") {
    //let update = { $set: { pinglun: [{ hot_name: "评论者", userhead: recobj.userhead, rec_num: 0, hot_com: newval, ori_con: recobj.hot_com, ori_name: recobj.hot_name, agr_num: 0, hot_date: "", item_id: recobj.item_id }] } };
    let update = { hot_name: "评论者", userhead: recobj.userhead, rec_num: 0, hot_com: newval, ori_con: recobj.hot_com, ori_name: recobj.hot_name, agr_num: 0, hot_date: "", item_id: recobj.item_id };
    //根据id找到并新增数据 
    list.findById(_id, function (error, listdata) {
      if (error) return handleError(error);
      listdata.pinglun.push(update);
      //点击点评新增数量
      let rec_num = recobj.rec_num;
      rec_num++;
      listdata.pinglun.id(rel_id).rec_num = rec_num;
      //此时listdata是list里面对应id的数据，所以doc也是对应id的数据
      //修改子文档必须要在最高级文档里面.save()保存
      listdata.save(function (err, doc) {
        if (err) return handleError(err);
        res.send(doc)
      })
    })

    /* list.findByIdAndUpdate(_id, update, { new: true }, function (err, listdata) {
      if (err) return handleError(err);

      res.send(listdata);
    }); */
  } else if (newRec != null) {
    let update = newRec;
    list.findById(_id, function (error, listdata) {
      if (error) return handleError(error);
      listdata.pinglun.push(update);
      listdata.save(function (err, doc) {
        if (err) return handleError(err);
        res.send(doc)
      })
    })
  }
  else {
    res.send(await list.find().where({ id: id }));
  }

  /* let id = req.body.id;
  if (id != -1) {
  res.send(await list.find().where({ id: id }));
  } else {
  res.send(await list.find());
  } */
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;