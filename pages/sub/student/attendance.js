// pages/sub/student/attendance.js
var app = getApp();
var bmap = require('../../../libs/bmap-wx.min.js');
var calendarSignData;
var date;
var calendarSignDay;
var is_qd;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    qdView: false,
    calendarSignData: "",
    calendarSignDay: "",
    is_qd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
   
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp = 7 - ((date - day) % 7);
    console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天  
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    var rawData = [2, 3,7,16];
    var is_qd;
    calendarSignData = new Array(monthDaySize)
    for (var i in rawData) {
      parseInt(rawData[i])
      calendarSignData[parseInt(rawData[i])] = parseInt(rawData[i])

      if (parseInt(rawData[i]) == date) {
        console.log(1)
        is_qd = true
      } else {

      }
    }
    console.log(calendarSignData);
    console.log(calendarSignDay)
    that.setData({
      is_qd: false,
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
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

  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  swichNav: function (e) {

    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  quxiaoQd: function (e) {
    var that = this;
    that.setData({
      qdView: false,
      is_qd: true
    })
  },
  calendarSign: function (e) {
    wx.showLoading({
      title: '位置获取中',
    });
    var BMap = new bmap.BMapWX({
      ak: 'B5795efa22d09926a581079b455af7db'
    });
    var fail = function(data) { 
            console.log(data) 
        }; 
    var success = function(data) {
        wx.hideToast(); 
        var wxMarkerData = data.wxMarkerData; 
        console.log("longitude:"+wxMarkerData[0].address );
        wx.showModal({
          title:"位置确认",
          content:"您当前的位置是:"+wxMarkerData[0].address+"附近",
          showCancel:false,
          success:function(){
            wx.showToast({
              title:"签到成功"
            })
          }
        })
    } 
    // 发起regeocoding检索请求 
    BMap.regeocoding({ 
        fail: fail, 
        success: success
    }); 
  }
})