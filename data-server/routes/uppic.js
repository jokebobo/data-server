const express = require('express');
const app = express();
let router = express.Router();
var fs = require('fs');
//文件上传中间件
var multer = require('multer');

//创建文件夹
var createFileDirectory = function (path) {
  try {
    //检测文件夹是否存在，不存在抛出错误
    fs.accessSync(path);
  } catch (error) {
    //创建文件夹
    fs.mkdirSync(path);
  }
}
//multer文件的硬盘存储模式
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //先创建路径在保存
    createFileDirectory('./upload/');
    //指定文件保存路径
    cb(null, './upload/');
  },
  filename: function (req, file, cb) {
    console.log(file)
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + '-' + file.originalname);

  }
})
var upload = multer({
  storage: storage
});
//文件上传测试,单图上传OK,多图上传不行
router.post('', upload.single('file'), function (req, res) {
  let avatar = req.file
  console.log(avatar)
  console.log(req.body)
  /*  if (avatar) {
     fs.unlink(avatar.path, (e) => {
       if (e) {
         console.log('文件操作失败')
         throw e;
       } else
         console.log('文件:' + avatar.path + '删除成功！');
     });
   } */
  res.status(200).send('上传成功');
})

module.exports = router;



