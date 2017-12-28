var root = 'http://www.xiaoqt.net/';
var Util = require('utils/util.js');
function req(url,data,callback){
  wx.request({
    url: root+url,
    data: Util.json2Form(data),
    method: 'POST',
    header: {"Content-Type": "application/x-www-form-urlencoded" },
    success: function(res){
      return typeof callback == "function" && callback(res.data);
    },
    fail: function(){
      return typeof callback == "function" && callback(false);
    }
  })
}

module.exports = { req: req } 