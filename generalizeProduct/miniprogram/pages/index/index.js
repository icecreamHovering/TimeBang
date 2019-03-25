//index.js
const app = getApp();

Page({
  data: {
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

    swipeChange(e){
        this.setData({
            swipeCurrent: e.detail.current
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});