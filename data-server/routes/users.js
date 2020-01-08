var express = require('express');
var router = express.Router();
var app = express();
/* 静态文件中间件 */
app.use(express.static('public'));
// 使用mongodb建立数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express', { useNewUrlParser: true })
//定义一个模型
const company = mongoose.model('company', new mongoose.Schema({
  tab: Number,
  arrs: Object
}))
//使用mongoDB新增数据
company.insertMany([
  {
    "tab": 1,
    "arrs":
    {
      "com_name": "南京冠亚装饰111",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic1.jpg"
    },

  },
  {
    "tab": 1,
    "arrs":
    {
      "com_name": "南京冠亚装饰sss",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 1,
    "arrs":
    {
      "com_name": "南京冠亚装饰www",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic1.jpg"
    },

  },
  {
    "tab": 1,
    "arrs":
    {
      "com_name": "南京冠亚装饰qqqq",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 2,
    "arrs":
    {
      "com_name": "南京冠亚装饰2222",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 2,
    "arrs":
    {
      "com_name": "南京冠亚装饰w222",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic1.jpg"
    },

  },
  {
    "tab": 2,
    "arrs":
    {
      "com_name": "南京冠亚装饰w222",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 2,
    "arrs":
    {
      "com_name": "南京冠亚装饰w222",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic3.jpg"
    },

  },
  {
    "tab": 2,
    "arrs":
    {
      "com_name": "南京冠亚装饰w222",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 3,
    "arrs":
    {
      "com_name": "南京冠亚装饰333",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic1.jpg"
    }
  },
  {
    "tab": 4,
    "arrs":
    {
      "com_name": "南京冠亚装饰444",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic2.jpg"
    },

  },
  {
    "tab": 5,
    "arrs":
    {
      "com_name": "南京冠亚装饰555",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic3.jpg"
    }

  },
  {
    "tab": 6,
    "arrs":
    {
      "com_name": "南京冠亚装饰666",
      "loc": "鼓楼区",
      "gift": "送精美手册一份",
      "ding": "送家用电器",
      "jl": "6.5",
      "pic": "http://localhost:3000/images/web_pic1.jpg"
    }

  }
])
/* 清楚之前mongodb数据库里所有数据 */
/* company.deleteMany({}).then(()=>callback()) */
/* GET users listing. */
/* 从数据库调取数据异步调取 */
router.post('/', async function (req, res, next) {
  //post方法获取参数
  var style = req.body.id;//对应tab
  var page = req.body.page;//当前页码数
  var num = 3;
  var skipnum = (page - 1) * 3;
  res.send(await company.find().where({
    //查找满足条件的数据
    tab: style
  }).skip(skipnum).limit(num))

});

module.exports = router;