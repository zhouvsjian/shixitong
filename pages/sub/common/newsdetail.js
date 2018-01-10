// pages/sub/common/newsdetail.js
const app = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      content:'',
      publish_time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsid = options.newsid;
    if(newsid){
      var that = this;
      app.func.req('/news/detail?token='+app.globalData.token+"&id="+newsid, {}, function (res) {
        WxParse.wxParse('content', 'html', res.content, that, 5);
        console.log("content:"+that.data.content)
        that.setData({
            title:res.title,
            content:that.data.content,
            publish_time:res.publish_time
        })
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})