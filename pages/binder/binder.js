const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    identify:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  identifyInput: function(e) {
    this.setData({
      identify:e.detail.value
    })
  },
  beginBind: function () {
    if(!this.data.phone){
      wx.showToast({
        title: '手机号不能为空'
      })
      return;
    }
    if(!this.data.identify){
      wx.showToast({
        title: '唯一号不能为空',
      })
      return;
    }
    app.func.req('bind?token=wx111&openid=' + app.globalData.openid + '&phone='+this.data.phone + '&keyid=' + this.data.identify, {}, function (res) {
      console.log(res.length)
    }); 
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
})