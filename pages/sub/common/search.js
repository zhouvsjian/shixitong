// pages/sub/common/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiIndex:[0,0],
    cityArray:[],
    region: ['江苏省', '南京市', '秦淮区'],
    locationName:'不限',
    postName:'不限',
    industryName:'不限',
    post:[],
    industry:[],
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.func.req("/list/zone?token="+app.globalData.token,{},function (res) {
      var province = res.map(item =>{
        return item.province;
      })
     // cityArray = res;
    });
     var that = this;
    app.func.req("/list/post?token="+app.globalData.token,{},function (res) {
      that.setData({
        post:res
      })
    });
     app.func.req("/list/industry?token="+app.globalData.token,{},function (res) {
      that.setData({
        industry:res
      })
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
  bindPickerCity: function(e){
    this.setData({
      locationName:e.detail.value
    })
  },
  bindPickerPost: function(e){
    this.setData({
      postName:this.data.post[e.detail.value].postName
    })
  },
  bindPickerIndustry: function(e){
    this.setData({
      industryName:this.data.industry[e.detail.value].name
    })
  },
  inputTyping:function(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  onBeginSearch:function(){
    if(this.data.keyword){

    }else{
      wx.showToast({
        title: '请输入关键字'
      });
    }
  }
})