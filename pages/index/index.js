import { request } from "../../request/request.js";
Page({
  /**w
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    categoryList: [],
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let that=this;
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: function(data) {
    //     const list= data.data.message;
    //     that.setData({
    //       swiperList:list
    //    })
    //   }
    // })
    this.getSwiper();
    this.getCategory();
    this.getFloor();
  },

  //获取轮播图信息
  getSwiper() {
    request("/home/swiperdata").then((data) => {
      let dataSwiper = data.data.message;
      dataSwiper.forEach(
        (v) => (v.navigator_url = v.navigator_url.replace(/main/, "index"))
      );

      this.setData({
        swiperList: dataSwiper,
      });
    });
  },
  //获取分类图信息
  getCategory() {
    request("/home/catitems").then((data) => {
      this.setData({
        categoryList: data.data.message,
      });
    });
  },
  //获取楼层信息
  getFloor() {
    request("/home/floordata").then((data) => {
      this.setData({
        floorList: data.data.message,
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
