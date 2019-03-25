// miniprogram/pages/aboutMe/aboutMe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{ icon: "../../images/loca.svg", title:"深圳南山区"},
      { icon: "../../images/tel.svg", title: "15670399643" },
      { icon: "../../images/email.svg", title: "719579723@qq.com" },
      { icon: "../../images/company.svg", title: "太邦科技有限公司" }]
  },
    //图片预览
    previewImage(url){
      if(url){
          let urls = [];
          urls.push(url);
          wx.previewImage({
              current: url, // 当前显示图片的http链接
              urls: urls // 需要预览的图片http链接列表
          })
      }
    },

    //复制文字
    copyText(data){
        if(data){
            wx.setClipboardData({
                data: data,
                success(res) {
                    wx.getClipboardData({
                        success(res) {
                            console.log(res.data) // data
                        }
                    })
                }
            })
        }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
});