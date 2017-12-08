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
        this.menuData = [{name:'个人中心',url:'',icon:'user'},{name:'实习登记',url:'',icon:'pencil'},{name:'签到请假',url:'',icon:'edit'},
                    {name:'简历管理',url:'',icon:'book'},{name:'查找岗位',url:'',icon:'search'},{name:'职位申请',url:'',icon:'shopping-cart'},
                    {name:'消息中心',url:'',icon:'envelope'},{name:'任务列表',url:'',icon:'tasks'},{name:'报告管理',url:'',icon:'file'}];
        break;
      case '4'://辅导员
      case '9'://班主任
       this.menuData = [{name:'个人资料',url:'',icon:'user'},{name:'实习任务',url:'',icon:'tasks'},{name:'考勤管理',url:'',icon:'time'},
                    {name:'消息中心',url:'',icon:'envelope'},{name:'实习走访',url:'',icon:'link'},{name:'批次管理',url:'',icon:'book'}];
        break;
      case '3'://导师
        this.menuData = [{name:'个人资料',url:'',icon:'user'},{name:'实习审核',url:'',icon:'eye-open'},{name:'查阅报告',url:'',icon:'file'},
                    {name:'实习任务',url:'',icon:'tasks'},{name:'考勤管理',url:'',icon:'time'},{name:'实习评分',url:'',icon:'check'},
                    {name:'消息中心',url:'',icon:'envelope'},{name:'实习走访',url:'',icon:'link'},{name:'批次管理',url:'',icon:'book'}];
        break;
      case '6'://师傅
        this.menuData = [{name:'个人资料',url:'',icon:'user'},{name:'学生任务',url:'',icon:'tasks'},{name:'查阅报告',url:'',icon:'file'},
                    {name:'实习评分',url:'',icon:'check'},{name:'考勤管理',url:'',icon:'time'},{name:'消息中心',url:'',icon:'envelope'}];
        break;
    }
    var that = this;
    that.setData({  
        menuData: that.menuData  
      })
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