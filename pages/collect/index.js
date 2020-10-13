// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collectList: [
      {
        id: 1,
        value: "商品收藏",
        isActive: true,
      },
      {
        id: 2,
        value: "品牌收藏",
        isActive: false,
      },
      {
        id: 3,
        value: "店铺收藏",
        isActive: false,
      },
      {
        id: 4,
        value: "浏览足迹",
        isActive: false,
      },
    ],
    collect: [],
  },
  //根据id来自定切换标题
  handleChange(e) {
    let { index } = e.detail;
    const { collectList } = this.data;

    collectList.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );

    this.setData({
      collectList,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //从缓存中获取collect
    let collect = wx.getStorageSync("collect") || [];
    //设置回data中
    this.setData({
      collect,
    });
  },

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
