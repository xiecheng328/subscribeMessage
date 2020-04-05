Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  msg() {
    console.log('msgmsg')
    const templateId = 'uOOcS145C_LPDTIpw1bzVDD2KKgugEEROPgo8o1L1KI'
    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success(res) {
        if (res[templateId] == 'accept') {
          //用户同意了订阅，允许订阅消息
          wx.showToast({
            title: '订阅成功'
          })
        } else {
          //用户拒绝了订阅，禁用订阅消息
          wx.showToast({
            title: '订阅失败'
          })
        }
      },
      fail(err) {
        console.error(err)
      }
    })
  },
  send() {
    wx.cloud.callFunction({
      name: 'msgsendtest'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      consle.error(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})