// pages/sub/student/applydetail.js
var Util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job:null,
    workid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.rowid){
      var userid = app.globalData.userid;
      var that =this;
      if(userid){
        app.func.req('/list/work/apply?userid='+userid+"&token="+app.globalData.token,{},function(res){
            if(res){
              that.setData({
                job:res[options.rowid],
                workid: res[options.rowid].JOB_ID
              })
            }
        });
      }
    }
  },

  unApply: function(e){
    if(this.data.workid){
      var that = this;
      app.func.req('/work/apply/cancel?userid='+app.globalData.userid+'&batchId='+app.globalData.batchid+'&workid='+this.data.workid+'&token='+app.globalData.token,{},function(res){
        if(res == 1) {
            wx.showToast({
              title:'撤销成功'
            });
            app.func.req('/list/work/apply?userid='+app.globalData.userid+"&token="+app.globalData.token,{},function(res){
                if(res){
                  that.setData({
                    job:res[options.rowid],
                    workid: res[options.rowid].JOB_ID
                  })
                }
            });
          } else {
            wx.showToast({
              title:'撤销失败',
              image:'../../../images/Forbidden.png'
            });
          }
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