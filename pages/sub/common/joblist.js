// pages/sub/common/joblist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joblist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.action == "list"){
      var that = this;
      app.func.req("/list/work?token="+app.globalData.token,{},function (res) {
        that.setData({
          joblist:res
        })
      });
    }else{
      var keyword = options.keyword;
			var city = options.location;
			var post = options.post;
			var industry = options.industry;
      var that = this;
      var param = {};
      param["userid"] = app.globalData.userid;
      param["keyword"] = keyword;
      if(city!="不限"){
        param["city"] = city;
      }
      if(post !="不限"){
        param["post"] = post;
      }
      if(industry!="不限"){
        param["industry"] = industry;
      }
      app.func.req("/search/work?token="+app.globalData.token,param,function(res){
        that.setData({
          joblist:res
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