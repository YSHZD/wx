Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCity:'',
    url:'',
    array: ['美国', '中国', '巴西', '日本']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var page = this
    wx.getLocation({
     type: 'wgs84', 
     success: function (res) {   
       var longitude = res.longitude
       var latitude = res.latitude
       page.loadCity(longitude, latitude)
     }
    }) 
  },
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=4124pGddxXrvjHS3mv73nni4D7ZVDaGC&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {   
        console.log(res);
        var city = res.data.result.addressComponent.city;
       page.setData({ currentCity: city });
      },
      fail: function () {
        page.setData({ currentCity: "获取定位失败" });
      },

    })
  },
  bindPickerChange: function(e) {
    this.setData({
      currentCity: this.data.array[e.detail.value]
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
    
    // wx.setNavigationBarTitle({
    //   title: '微问卷'
    // })
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

  }
})