App({
  appApi: {
  },
  globalData: {
   
  },
  wxRequest:function(url,data,method){
    wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100); 
        if (res.data.code != 200) {
          wx.showModal({
            title: '提交失败！',
            content: res.data.msg,
            showCancel: false
          })
        }
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.navigateTo({
            url: '/pages/create/create',
          })
        }else{
          wx.redirectTo({
            url: '/pages/eidtAnswer/eidtAnswer?id=' + res.data.result.item.id,
          })
        }
      },
      fail: function (error) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100); 
        wx.showModal({
          title: '提交失败！',
          content: error,
          showCancel: false
        })
        console.log(error);
      }
    })
  },
  wxRQ: function (url, data, method, success) {
    wx.showLoading({
      title: '加载中...',
    });
    return wx.request({
      url: url,
      data: data,
      dataType: 'json',
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (res.data.code != 200) {
          wx.showModal({
            title: '提交失败！',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          success(res);
        }
      },
      fail: function (error) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        wx.showModal({
          title: '请求失败！',
          content: error,
          showCancel: false
        })
        console.log(error);
      }
    });
  },
  onLaunch: function () {
    /*let that = this;
    that.userLogin();

    wx.getUserInfo({
      success: function (res) { console.log(res);
        wx.setStorageSync('userInfo', res.userInfo);
        that.globalData.userInfo = wx.getStorageSync('userInfo');
      }
    });*/
  },

  // 用户登录
  userLogin: function () {
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res);
          //发起网络请求
          wx.request({
            url: getApp().appApi.userLoginAPI,
            data: {
              code: res.code
            },
            dataType: 'json',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {console.log(res)
              if (res.data.code != 200) {
                wx.showModal({
                  title: '请求失败11！',
                  content: res.data.msg,
                  showCancel: false
                })
              } else {
              console.log(res); 
              // 设置Storage
                wx.setStorageSync('token', res.data.result.item.token);
                getApp().globalData.token = res.data.result.item.token;
                wx.setStorageSync('uid', res.data.result.item.uid);
                wx.setStorageSync('openid', res.data.result.item.openid);
                getApp().globalData.uid = res.data.result.item.uid;
                getApp().globalData.openid = res.data.result.item.openid;
                // console.log(getApp().globalData)
              that.uploadUserInfo();
              }
            }
          })
        } else {
          wx.showModal({
            title: '请求失败！',
            content: '获取用户登录态失败！' + res.errMsg,
          })
        }
      }
    });
  },

  // 获取用户uid
  getUserId: function () {
    return wx.getStorageSync('uid');
  },

  // 检查用户登录
  checkUserLogin: function () {
    let that = this;
    wx.checkSession({
      success: function () {
      },
      fail: function () {
        //登录态过期 重新登录
        that.userLogin();
      }
    });
  },

  // 上传用户信息 wx.getUserInfo
  uploadUserInfo: function () {
    let that = this;
    that.checkUserLogin();
    wx.getSetting({
      success(res) {
        console.log("获取用户授权设置");
        // 检查用户是否授权，用户信息
        if (!res['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              console.log('获取用户信息成功');
              wx.request({
                url: getApp().appApi.updateUserAPI,
                dataType: 'json',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  'token': wx.getStorageSync('token'),
                  'uid': wx.getStorageSync('uid')
                },
                data: {
                  openid: getApp().globalData.openid,
                  nickname: res.userInfo.nickName,
                  avatar: res.userInfo.avatarUrl,
                  gender: res.userInfo.gender,
                  province: res.userInfo.province,
                  city: res.userInfo.city,
                  country: res.userInfo.country
                },
                success: function (res) {
                  if (res.data.code != 200) {
                    wx.showModal({
                      title: '失败！',
                      content: res.data.msg,
                      showCancel: false
                    })
                  }
                }
              });
            }
          });
        }
      }
    })
  },
})
