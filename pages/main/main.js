const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    switch(app.globalData.roleid){
      case '7'://学生
        menuData = [{name:'个人中心',url:''},{name:'实习登记',url:''},{name:'签到请假',url:''},{name:'简历管理',url:''},{name:'查找岗位',url:''},
                  {name:'职位申请',url:''},{name:'消息中心',url:''},{name:'任务列表',url:''},{name:'报告管理',url:''}];
        break;
      case '4'://辅导员
      case '9'://班主任
        break;
      case '3'://导师
        break;
      case '6'://师傅
        break;
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