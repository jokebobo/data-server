const express = require('express');
const router = express.Router;

const mongoose = require('mongoose');
//27017默认的地址，/后面是随便设置的数据库名称
mongoose.connect('mongodb://27017/express', { useNewUrlParser: true });
const Mock = require('mockjs');
//子文档
let pinglun = new mongoose.Schema({
<<<<<<< HEAD
item_id: Number,
userhead: String,
hot_name: String,
hot_date: Date,
agr_num: Number,
rec_num: Number,
hot_com: String,
picarrs: Array,
ori_con: String,
ori_name: String
})
//父文档
let chatlist = mongoose.model('chatlist', new mongoose.Schema({
id: Number,
pinglun: [pinglun]
}))
//var pllist = [];

for (let i = 0; i < 10; i++) { //设置子文档 var pllist=[]; for (let j=0; j < 10; j++) { let pl={ item_id: j, userhead:
  Mock.Random.image('65x65', '#00cc00' , '#FFF' , 'png' , '65x65' ), hot_name: Mock.Random.cname(), hot_date:
  Mock.Random.date('yyyy-MM-dd'), agr_num: parseInt(Math.random() * 600), rec_num: parseInt(Math.random() * 600),
  hot_com: Mock.Random.cparagraph(), picarrs: [ Mock.Random.image('219x172', '#ccc000' , '#FFF' , 'png' , '219x172' ),
  Mock.Random.image('219x172', '#ccc000' , '#FFF' , 'png' , '219x172' ), Mock.Random.image('219x172', '#ccc000' , '#FFF'
  , 'png' , '219x172' ) ], ori_con: "" , ori_name: "" } pllist.push(pl); } //将子文档添加到父文档 // chatlist.insertMany({ id: i,
  pinglun: pllist }); } // chatlist.insertMany(pllist); // chatlist.deleteMany({}).then(()=> callback())
  module.exports = chatlist;
=======
  item_id: Number,
  userhead: String,
  hot_name: String,
  hot_date: Date,
  agr_num: Number,
  rec_num: Number,
  hot_com: String,
  picarrs: Array,
  ori_con: String,
  ori_name: String
})
//父文档
let chatlist = mongoose.model('chatlist', new mongoose.Schema({
  id: Number,
  pinglun: [pinglun]
}))
//var pllist = [];

for (let i = 0; i < 10; i++) {
  //设置子文档 
  var pllist = [];
  for (let j = 0; j < 10; j++) {
    let pl = {
      item_id: j, userhead:
        Mock.Random.image('65x65', '#00cc00', '#FFF', 'png', '65x65'), hot_name: Mock.Random.cname(), hot_date:
        Mock.Random.date('yyyy-MM-dd'), agr_num: parseInt(Math.random() * 600), rec_num: parseInt(Math.random() * 600),
      hot_com: Mock.Random.cparagraph(), picarrs: [Mock.Random.image('219x172', '#ccc000', '#FFF', 'png', '219x172'),
      Mock.Random.image('219x172', '#ccc000', '#FFF', 'png', '219x172'), Mock.Random.image('219x172', '#ccc000', '#FFF'
        , 'png', '219x172')], ori_con: "", ori_name: ""
    }
    pllist.push(pl);
  }
  //将子文档添加到父文档 
  // chatlist.insertMany({ id: i,pinglun: pllist }); 
}
// chatlist.insertMany(pllist); 
// chatlist.deleteMany({}).then(()=> callback())
module.exports = chatlist;
>>>>>>> 第二次提交
