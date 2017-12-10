// pages/sub/common/userinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      name:"张三",
      sex:'男',
      phone:'15850538645',
      email:'zhangsan@126.com'
    },
    state:"view",
    buttonLabel:'编辑',
    disabled:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.func.req('user?token=wx111&openid=' + app.globalData.openid + '&phone='+this.data.phone + '&keyid=' + this.data.identify, {}, function (res) {
      //console.log(res.length)
      //this.setData({user:{}});
    });
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

  phoneInput: function(e){
    this.setData({
      user:{
        phone:e.detail.value
      }
    })
  },

  emailInput: function(e){
    this.setData({
      user:{
        email:e.detail.value
      }
    })
  },
  /**
   * 点击按钮编辑或保存
   */
  onBtnTapped: function() {
    if(this.data.state == "view"){
      this.setData({
        buttonLabel:'保存',
        disabled:false,
        state:'edit'
      })
    }else if(this.data.state == "edit"){
      this.setData({
        buttonLabel:'编辑',
        disabled:true,
        state:'view'
      })
    }
  }
})