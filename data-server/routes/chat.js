let express = require('express');
let router = express.Router;

const mongoose = require('mongoose');
mongoose.connect('mongodb://27017/express', { useNewUrlParser: true });
const Mock = require('mockjs');
const chat = mongoose.model('chat', new mongoose.Schema({
  tit: String,
  num: Number,
  id: Number,
  chatcon: String,
  pinglun: Object,
  pic: String,
  recpl: String
}))
var chatarr = [];
for (let i = 0; i < 10; i++) {
  let chat = {
    tit: Mock.Random.ctitle(20),
    num: parseInt(Math.random() * 600),
    pic: Mock.Random.image('750x424', '#02adea', '#FFF', 'png', '750x424'),
    id: i,
    chatcon: Mock.Random.cparagraph(),
    inpval: ""
  }
  chatarr.push(chat);
}
/* chat.insertMany(chatarr); */
/* chat.deleteMany({}).then(() => callback()) */
/* router.get('/', async function (res, req) {
  res.send(await chat.find());
}) */
module.exports = chat;
/* module.exports = router; */
