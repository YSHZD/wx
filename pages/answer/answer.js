let obj = {};
function has(arr,item){
  for( let k=0;k<arr.length;k++){
    if(arr[k]==item){
      return true;
    }
  }
  return false;
}
function itemId(arr, id){
   return arr.filter(function(item){
    return parseInt(item.id) === parseInt(id)
   })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
     currentId:0,
     historyId:[],
     rules:{'2-0':3,'3-0':4,'4-0':5,'5-0':6,'6-0':7},
     answers:[{'id':2,'title':'id2你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'“中国梦”的核心目标也可以概括为“两个一百年”的目标，也就是：到2021年中国共产党成立100周年和2049年中华人民共和国成立100周年时，逐步并最终顺利实现中华民族的伟大复兴，具体表现是国家富强、民族振兴、人民幸福，实现途径是走中国特色的社会主义道路、坚持中国特色社会主义理论体系、弘扬民族精神、凝聚中国力量，实施手段是政治、经济、文化、社会、生态文明五位一体建设'},
     {'id':3,'title':'id3你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'本期节目主要内容'},
     {'id':4,'title':'id4你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'本期节目主要内容'},
     {'id':5,'title':'id5你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'本期节目主要内容'},
     {'id':6,'title':'id6你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'本期节目主要内容'},
     {'id':7,'title':'id7你的户籍在哪个区域？','options':[{'name':'热武器热武器'},{'name':'大幅度'},{'name':'代发答复'},{'name':'哦为人妻二'}],'tips':'本期节目主要内容'}
     ],
    currentItem:null
  },
  radioChange: function(e) {
    let endObj = {};
    let that = this;
    let ID = e.target.dataset.id;
    if(!has(that.data.historyId,ID)){
      let historyids = that.data.historyId;
      historyids.push(ID);
      console.log(historyids);
      that.setData({
        historyId:historyids
      })
    }
    obj[ID] = e.detail.value;
    let newId = ID+'-'+e.detail.value;
    let oldId = that.data.rules[newId];
    if(oldId){
      that.setData({
        currentItem:itemId(that.data.answers,oldId),
      })
    }else{
      that.data.historyId.forEach(item => endObj[item] = obj[item]);
      console.log(endObj);
      console.log('end------')
      wx.redirectTo({
        url: '/pages/result/result',
      })
    }
  },
  back:function(){
    var that = this;
    let historysplit = that.data.historyId;
    console.log(historysplit);
    if(historysplit.length>0){
      let curId = historysplit.pop();
      console.log(historysplit);
       that.setData({
        currentItem:itemId(that.data.answers,curId),
        historyId:historysplit
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    var that = this;
     that.setData({
        currentItem:itemId(that.data.answers,that.data.answers[0].id),
      })
    // wx.setNavigationBarTitle({
    //   title: ''
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