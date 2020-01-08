var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //这种请求路径的写法可以获取127.0.0.1:3000/csdn?name=参数
  var query=req.query.id;
  res.send({"query":query});
});

module.exports = router;
