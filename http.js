var root = 'http://www.xiaoqt.net/';
function req(url,data,callback){
  wx.request({
    url: root+url,
    data: data,
    method: 'POST',
    header: {'content-type':'application/json'},
    success: function(res){
      return typeof callback == "function" && callback(res.data);
    },
    fail: function(){
      return typeof callback == "function" && callback(false);
    }
  })
}

module.exports = { req: req } 