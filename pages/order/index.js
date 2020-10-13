import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    list: [
      {
        id: 1,
        value: "全部",
        isActive: true,
      },
      {
        id: 2,
        value: "待付款",
        isActive: false,
      },
      {
        id: 3,
        value: "待发货",
        isActive: false,
      },
      {
        id: 4,
        value: "退款/退货",
        isActive: false,
      },
    ],
  },

  //根据id来自定切换标题
  changeTitleByIndex(index) {
    const { list } = this.data;

    list.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );

    this.setData({
      list,
    });
  },
  handleChange(e) {
    let { index } = e.detail;
    this.changeTitleByIndex(index);
    //重新发送请求
    this.getOrder(index + 1);
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
    let pages = getCurrentPages();
    let { type } = pages[pages.length - 1].options;
    console.log(type);
    this.changeTitleByIndex(type - 1);
    this.getOrder(type);
  },
  //发送请求获取订单数据
  async getOrder(typeID) {
    //获取用户的token值
    let Headers = {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo",
    };

    let res = await request(
      "/my/orders/all?type=" + typeID + "",
      null,
      Headers,
      null
    );
    res.data.message.orders.forEach((v) => {
      v.time = new Date(v.create_time * 1000).toLocaleString();
    });
    this.setData({
      orderList: res.data.message.orders,
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
