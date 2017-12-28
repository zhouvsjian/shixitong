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
    var that = this;
    app.func.req('/user?token='+app.globalData.token+'&userid=' + app.globalData.userid, {}, function (res) {
      console.log(res)
      that.setData({user:res});
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
    var that = this;
    this.setData({
      user:{
        name:this.data.user.name,
        sex:this.data.user.sex,
        phone:e.detail.value,
        email:this.data.user.email
      }
    })
  },

  emailInput: function(e){
     var that = this;
    this.setData({
      user:{
        name:this.data.user.name,
        sex:this.data.user.sex,
        phone:this.data.user.phone,
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
     var that = this;
      var param = {};
      param["userId"] = app.globalData.userid;
			param["sex"] = this.data.user.sex;
      param["phone"] = this.data.user.phone;
      param["email"] =this.data.user.email;
      param["token"] = app.globalData.token;
       app.func.req('user/update', param, function (res) {
         if(res == 1){
           wx.showToast({
             title:'修改成功'
           });
            that.setData({
              buttonLabel:'编辑',
              disabled:true,
              state:'view'
            })
         }
        console.log("update success"+res)
      });
    }
  }
})