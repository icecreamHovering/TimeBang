//index.js
const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    movableX: null,
    movableY: null,
    swipeCurrent: 0,
    swipeData: [{
        key: 1,
        name: 'Designing',
      imgUrl: 'https://www.actiu.com/uploads/images/actualidad/la-transformacion-de-la-educacion-a-traves-de-sus-espacios-1_crop_628_628.jpg'
      },
      {
        key: 2,
        name: 'Designing',
        imgUrl: 'https://www.actiu.com/uploads/images/actualidad/las-claves-para-el-diseno-de-los-nuevos-entornos-de-trabajo-1_crop_628_628.jpg'
      },
      {
        key: 3,
        name: 'Designing',
        imgUrl: 'https://www.actiu.com/uploads/images/actualidad/disenando-para-la-generacion-milenial-1_crop_628_628.jpg'
      },
      {
        key: 4,
        name: 'Designing',
        imgUrl: 'https://www.actiu.com/uploads/images/actualidad/febrero-el-mes-del-diseno-en-madrid-1_crop_628_628.jpg'
      }
    ]
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        /*if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
            }
          });
        }*/
      }
    });
    wx.getSystemInfo({
      success: res => {
        this.setData({
          movableX: res.screenWidth / 2 - 30,
          movableY: res.screenHeight - 160
        });
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  swipeChange(e) {
    this.setData({
      swipeCurrent: e.detail.current
    });
  },
});