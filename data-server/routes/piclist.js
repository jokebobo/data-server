const express = require('express');
const app = express();
const router = express.Router();
/* 静态文件中间件 */
app.use(express.static('public'));
// 使用mongodb建立数据库
const mongoose = require('mongoose');
/* const db=require('mongodb').Db,
connection=require('mongodb').connection,
Server = require('../lib/mongodb').Server,
BSON = require('../lib/mongodb').BSONPure;

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT; */

mongoose.connect('mongodb://localhost:27017/express', { useNewUrlParser: true })
//定义一个模型
const piclist = mongoose.model('piclist', new mongoose.Schema({
  type: Number,
  fun: Number,
  style: Number,
  part: Number,
  name: String,
  img: String
}))
/* piclist.insertMany([
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室11",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室22",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室33",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室44",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室55",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室66",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室77",
    img: "http://localhost:3000/images/web_pic2.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室88",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室99",
    img: "http://localhost:3000/images/web_pic3.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室123",
    img: "http://localhost:3000/images/web_pic2.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室12345",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 1,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室hello",
    img: "http://localhost:3000/images/web_pic2.jpg"
  },
  {
    type: 1,
    fun: 1,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室333",
    img: "http://localhost:3000/images/web_pic2.jpg"
  },
  {
    type: 1,
    fun: 1,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室555",
    img: "http://localhost:3000/images/web_pic3.jpg"
  },
  {
    type: 1,
    fun: 1,
    style: 0,
    part: 0,
    name: "江水平装修现代卧室666",
    img: "http://localhost:3000/images/web_pic1.jpg"
  },
  {
    type: 2,
    fun: 0,
    style: 0,
    part: 0,
    name: "江水平装修现代飘窗",
    img: "http://localhost:3000/images/web_pic2.jpg"
  }
]) */

/* piclist.deleteMany({}).then(() => callback()) */

router.post('/', async function (req, res) {
  const type = req.body.type;
  const fun = req.body.fun;
  const style = req.body.style;
  const part = req.body.part;
  const skip = req.body.times * 10;
  const serkey = req.body.serkey;
  const reg = new RegExp(serkey);
  console.log(req.body.times);
  if (type == 0 && fun == 0 && style == 0 && part == 0) {
    //不分类的所有数据
    res.send(await piclist.find().limit(10).skip(skip))
  } else if (serkey != undefined) {
    //实现模糊搜索功能，根据正则过滤内容
    if (skip != undefined) {
      //返回第一页的数据
      res.send(await piclist.find({ name: { $regex: reg } }).limit(10).skip(skip));
    } else {
      //返回所有的数据
      res.send(await piclist.find({ name: { $regex: reg } }));
    }

  } else {
    res.send(await piclist.find().where({ type: type, fun: fun, style: style, part: part }).limit(10).skip(skip))
  }
})
module.exports = router;