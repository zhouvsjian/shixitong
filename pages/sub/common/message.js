// pages/sub/common/message.js
var Util = require('../../../utils/util.js');
var app = getApp();
var sliderWidth = 126;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["新建", "未读", "已读","已发送"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    showModal:false,
    classes:[],
    multiArray:[],
    tempMultiArray:[],
    receiverName:'',
    receiver:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
            that.setData({
                sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
        }
    });

    var roleid = app.globalData.roleid;
    var url;
    if(roleid == 3 || roleid == 4 || roleid == 9) { //老师/辅导员
      url = '/im/talk/stu?userId=' + app.globalData.userid + "&token=" + app.globalData.token;
    } else if(roleid == 7) { //学生
      url = '/im/talk/teacher?userId=' + app.globalData.userid + "&token=" + app.globalData.token;
    } else if(roleid == 6) { //师傅
      url = '/im/talk/stu?userId=' + app.globalData.userid + "&token=" + app.globalData.token;
    }
     app.func.req(url,{},function(res){
        if(res){
          if(app.globalData.roleid == 7){
            var teacher = [];
            if(res.FU_TEACHER_USER_ID) {
              teacher.push({userid:res.FU_TEACHER_USER_ID,name:res.FU_TEACHER_NAME,checked:false});
            }
            //师傅
            if(res.MASTER_USER_ID) {
              teacher.push({userid:res.MASTER_USER_ID,name:res.MASTER_NAME,checked:false});
            }
            //老师
            if(res.TEACHER_USER_ID) {
              teacher.push({userid:res.TEACHER_USER_ID,name:res.TEACHER_NAME,checked:false});
            }
            if(res.HEAD_TEACHER_USER_ID){
              teacher.push({userid:res.HEAD_TEACHER_USER_ID,name:res.HEAD_TEACHER_NAME,checked:false});
            }
            that.setData({
              multiArray:teacher,
              tempMultiArray:teacher
            })
          }
          else{
            var classes = [];
            classes = Array.from(new Set(res.map(item => {　　　　// 此方法将班级名称区分到一个新数组中,并且去重
              return item.CLASS_ID;
            })));
            classes = classes.map(item =>{
              return {classid:item,classname:Array.from(new Set(res.map(item2=>{
                  if(item == item2.CLASS_ID){
                    return item2.CLASS_NAME;
                  }
              })))[0]}
            });
            that.setData({
              classes:classes
            })
            var students = [];
            students = Array.from(new Set(res.map(item => {　　　　// 此方法将学生名称区分到一个新数组中,并且去重
              return {classid:item.CLASS_ID,userid:item.USER_ID,username:item.NAME};
            })));
            that.setData({
              multiArray:students,
              tempMultiArray:students
            })
          }
        }
     });
  },

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },

  receiverPick:function(e){
      this.setData({
        showModal: true
      })
  },

  /**
     * 隐藏模态对话框
     */
    hideModal: function () {
      this.setData({
        showModal: false
      });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
      this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
      this.setData({
        multiArray:this.data.tempMultiArray
      })
      var receiverName = '';
      var receiver = [];
      this.data.multiArray.map(item => {　　　　
          if(item.checked){
            receiverName+= item.name+",";
            receiver.push(item.userid);
          }
        });
      this.setData({
        receiverName:receiverName.substr(0,receiverName.length-1),
        receiver:receiver
      })
      this.hideModal();
    },

    bindChange:function(e){
      const val = e.detail.value;
    },

    selectItem: function(e){
      var index = e.target.dataset.index;
      if(index){
        var receiver = this.data.tempMultiArray;
        receiver.map(item => {　　　　
          if(item.userid == index){
            item.checked = !item.checked;
          }
        });
        this.setData({
          tempMultiArray:receiver
        })
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