// pages/sub/student/register.js
var Util = require('../../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      stuId:'',
      zone:[],
      zoneId:'',
      catagory:[],
      catagoryIndex:0,
      catagoryId:'',
      industry:[],
      industryIndex:0,
      industryId:'',
      scaleArray:["1-50人","50-100人","100-1000人","1000-10000人","10000人以上"],
      scaleIndex:0,
      scale:'',
      multiArray:[],
      tempMultiArray:[],
      multiIndex:[0,0],
      tempMultiIndex:[0,0],
      epName:'',
      address:'',
      post:'',
      insurance:'',
      contactName:'',
      contactTele:'',
      contactTitle:'',
      masterName:'',
      masterTele:'',
      masterSkill:'',
      summary:'',
      haveAgreement:false,
      haveInsurance:false,
      masterId:'',
      masterUserId:'',
      files:[],
      curCompany:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userid) {
      var that = this;
      app.func.req('/user?userid=' + app.globalData.userid + '&token=' + app.globalData.token, {}, function (res) {
        if(res){
          that.setData({
            stuId:res.keyId
          });
          if(res.keyId){
            app.func.req('/api/register_work_preview?userId=' + app.globalData.userid + '&batchId=' + app.globalData.batchid+'&token='+app.globalData.token,{},function(res2){
              if(res2){
                var data = {};
                var zone = res2.zone;
                data.zone = zone;
                var catagory = res2.catagory;
                data.catagory = catagory;
                var industry = res2.industry;
                data.industry = industry;
                that.setData({
                  zone:zone,
                  catagory:catagory,
                  industry:industry
                })
                
                var company = res2.company;
                if(company){
                  data.curCompany = company;
                }
                
                var provinceArr = Array.from(new Set(zone.map(item => {　　　　// 此方法将省份名称区分到一个新数组中,并且去重
                  return item.province;
                })));
                data.masterId = res2.master.MASTER_ID;
								data.masterUserId = res2.master.USER_ID;
                data.multiArray = [provinceArr,[]];
                data.tempMultiArray = [provinceArr,[]];
                if(company){
                  data.epName = company.name;
                  data.address = company.address;
                  data.scale = company.peopleSum;
                  data.post = res2.post;
                  data.masterName = res2.master.NAME;
                  data.masterTele = res2.master.PHONE;
                  data.contactName = company.contact;
                  data.contactTele = company.contactPhone;
                  data.contactTitle = company.title;
                  data.masterSkill = res2.master.SKILL;
                  data.summary = company.summary;               
                  for(var i = 0;i<zone.length;i++){
                    if(zone[i].zoneId == company.zoneId){
                      data.zoneId = company.zoneId;
                      data.multiArray=[provinceArr,that.searchCityInfo(zone[i].province)];
                      data.multiIndex = [provinceArr.indexOf(zone[i].province),that.searchCityInfo(zone[i].province).indexOf(zone[i].city)];
                      data.tempMultiArray = [provinceArr,that.searchCityInfo(zone[i].province)];
                      data.tempMultiIndex = [provinceArr.indexOf(zone[i].province),that.searchCityInfo(zone[i].province).indexOf(zone[i].city)];
                    }
                  }
                  for(var j = 0;j<catagory.length;j++){
                    if(company.catagoryId == catagory[j].catagoryId){
                      data.catagoryIndex = j;
                      data.catagoryId = company.catagoryId;
                      break;
                    }
                  }
                  for(var m = 0;m<industry.length;m++){
                    if(company.industryId == industry[m].industryId){
                      data.industryIndex = m;
                      data.industryId = company.industryId;
                      break;
                    }
                  }
                  data.scale = company.peopleSum;
                  data.scaleIndex = that.data.scaleArray.indexOf(company.peopleSum);
                }
                else{
                  var defaultProvince = provinceArr[0];
                  if(defaultProvince){
                    data.tempMultiArray = [provinceArr,that.searchCityInfo(defaultProvince)];
                    data.multiArray = [provinceArr,that.searchCityInfo(defaultProvince)];
                    data.zoneId = that.getZoneId(that.searchCityInfo(defaultProvince)[0])
                  }

                  if(catagory.length){
                    data.catagoryId = catagory[0].catagoryId;
                  }

                  if(industry.length){
                    data.industryId = industry[0].industryId;
                  }
                }
                that.setData(data);
              }
            })
          }
        }
      })
    }

  },

/**
 * 根据省份名称获取包含的城市 
 */
  searchCityInfo:function(province,isTemp = false){
     if(province){
       var zone = this.data.zone;
       var num = zone.length;
       var cities = [];
       for(var i = 0;i<num;i++){
         if(zone[i].province == province){
            cities.push(zone[i].city);
         }
       }
       return cities;
     }
     return; 
  },

  /**
   * 根据城市名称获取zoneId
   */
  getZoneId:function(name){
    var zone = this.data.zone;
    var num = zone.length;
    for(var i=0;i<num;i++){
      if(zone[i].city == name){
        return zone[i].zoneId;
      }
    }
    return -1;
  },

  bindMultiPickerColumnChange: function (e) {
    //e.detail.column 改变的数组下标列, e.detail.value 改变对应列的值
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      tempMultiIndex: this.data.multiIndex
    };
    data.tempMultiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var province = this.data.tempMultiArray[0][e.detail.value];
        var cities = this.searchCityInfo(province);
        data.tempMultiArray=[this.data.tempMultiArray[0],cities]　　　　　　
        data.tempMultiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray:[],
      multiIndex:[]
    }
    data.multiArray = this.data.tempMultiArray;
    data.multiIndex = this.data.tempMultiIndex;
    data.zoneId = this.getZoneId(data.multiArray[1][data.multiIndex[1]]);
    this.setData(data);
  },

  bindCatagoryChange:function (e) {
    this.setData({
        catagoryIndex:e.detail.value,
        catagoryId:this.data.catagory[e.detail.value].catagoryId
    });
  },

  bindIndustryChange:function (e) {
    this.setData({
        industryIndex:e.detail.value,
        industryId:this.data.industry[e.detail.value].industryId
    });
  },

  bindScaleChange:function (e) {
    this.setData({
        scaleIndex:e.detail.value,
        scale:this.data.scaleArray[e.detail.value]
    });
  },

  changeAgreement:function(e){
    this.setData({
      haveAgreement:e.detail.value
    })
  },

  changeInsurance:function(e){
    this.setData({
      haveInsurance:e.detail.value
    })
  },

  chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },

    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },

    epNameInput: function(e){
      this.setData({
        epName:e.detail.value
      })
    },

    addrInput: function(e){
      this.setData({
        address:e.detail.value
      })
    },

    postInput: function(e){
      this.setData({
        post:e.detail.value
      })
    },

    insuranceInput: function(e){
      this.setData({
        insurance:e.detail.value
      })
    },

    contactNameInput: function(e){
      this.setData({
        contactName:e.detail.value
      })
    },

    contactTeleInput: function(e){
      this.setData({
        contactTele:e.detail.value
      })
    },

    contactTitleInput: function(e){
      this.setData({
        contactTitle:e.detail.value
      })
    },

    masterNameInput: function(e){
      this.setData({
        masterName:e.detail.value
      })
    },

    masterTeleInput: function(e){
      this.setData({
         masterTele:e.detail.value
      })
    },

    masterSkillInput: function(e){
      this.setData({
         masterSkill:e.detail.value
      })
    },

    summaryInput: function(e){
      this.setData({
         summary:e.detail.value
      })
    },

    onRegister: function(e){
        if(!this.data.epName){
          wx.showToast({
            title:"企业名称不能为空",
            image:'../../../images/Forbidden.png'
          })
          return;
        }
        if(!this.data.zoneId){
          wx.showToast({
            title:"请选择地区",
            image:'../../../images/Forbidden.png'
          })
          return;
        }
        if(!this.data.industryId){
          wx.showToast({
            title:"请选择行业",
            image:'../../../images/Forbidden.png'
          })
          return;
        }
        if(!this.data.masterName || !this.data.masterTele){
          wx.showToast({
            title:"请完善师傅信息",
            image:'../../../images/Forbidden.png'
          })
          return;
        }
        if(!this.data.contactName || !this.data.contactTele || !this.data.contactTitle){
          wx.showToast({
            title:"请完善联系人信息",
            image:'../../../images/Forbidden.png'
          })
          return;
        }
        var param = {};
        param.userId = app.globalData.userid;
        param.stuId = this.data.stuId;
        param.name = this.data.epName;
        param.zoneId = this.data.zoneId;
        param.catagoryId = this.data.catagoryId;
        param.industryId = this.data.industryId;
        param.address = this.data.address;
        param.scale =this.data.scale;
        param.agreement = this.data.haveAgreement?1:0;
        param.insurance = this.data.haveInsurance?1:0;
        param.insuranceNo = this.data.insurance;
        param.post = this.data.post;
        param.masterName = this.data.masterName;
        param.masterPhone = this.data.masterTele;
        param.masterSkill = this.data.masterSkill;
        param.masterId = this.data.masterId;
        param.masterUserId = this.data.masterUserId;
        param.token = app.globalData.token;
        param.contact = this.data.contactName;
        param.contactPhone = this.data.contactTele;
        param.title = this.data.contactTitle;
        param.summary = this.data.summary;
        param.batchId = app.globalData.batchid;

        var toUpload = this.data.files;
        var uploadIndex = 0;
        
        if(toUpload.length){
            for (var i = 0, h = toUpload.length; i < h; i++) {
              var formData = new FormData();
              formData.append("bizCode", app.globalData.userid);
              formData.append("sceneCode", "s004");
              formData.append("id", toUpload[i].id);
              formData.append("name", toUpload[i].name);
              formData.append("type", toUpload[i].type);
              formData.append("lastModifiedDate", toUpload[i].lastModifiedDate);
              formData.append("size", toUpload[i].size);
              formData.append("file", toUpload[i]);
              formData.append("token", app.globalData.token);
              wx.uploadFile({
                url: 'http://www.xiaoqt.net/user/upload', //仅为示例，非真实的接口地址
                filePath: toUpload[i],
                name: 'file',
                formData:formData,
                success: function(res){
                  if(res.indexOf(",") != -1) {
                    //上传成功
                    //currentIndex++;
                    //uploadImages();
                  }
                },
                fail:function(res){
                    wx.showToast({
                      title:"上传失败"
                    })
                }
              })
            }
        }
        if(this.data.curCompany){//变更登记
          param.companyId = this.data.curCompany.companyId;
          app.func.req("/api/register_work_update",param,function(res){
            if(res){
              wx.showToast({
                title:'变更成功'
              })
            }
          });
        }else{//新登记
          app.func.req("/api/register_work",param,function(res){
            if(res){
              wx.showToast({
                title:'登记成功'
              })
            }
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