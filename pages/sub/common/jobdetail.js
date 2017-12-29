// pages/sub/common/jobdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobdetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var jobid = options.id;
    if(jobid){
      var that = this;
      app.func.req("/work?token=" + app.globalData.token+"&jobid="+jobid+"&userid="+app.globalData.userid, {}, function (res) {
        that.setData({
          jobdetail: res
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
  
  },
  applyJob: function(e){
     app.func.req('/user?token='+app.globalData.token+'&userid=' + app.globalData.userid, {}, function (res) {
      if(res.work){
        wx.showToast({
          title:"实习中,不能申请"
        })
        return;
      }
    });
    app.func.req('/work/apply/querynum?token='+app.globalData.token+'&userid=' + app.globalData.userid, {}, function (res) {
      if(res.work){
        wx.showToast({
          title:"实习中,不能申请"
        })
        return;
      }
    });
  }
})