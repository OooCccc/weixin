import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    isShow: true,
    inputValue: "",
  },
  //定时器初始化
  Time: -1,
  //输入框搜索事件
  handelInput(e) {
    //拿到值
    let { value } = e.detail;
    console.log(value);

    //进行合法性检测
    value = value.trim();
    //
    if (!value) {
      this.setData({
        isShow: false,
        searchList: [],
      });
      return;
    }
    //发送请求
    //关闭上一个定时器
    this.setData({
      isShow: false,
    });
    clearTimeout(this.Time);
    this.Time = setTimeout(() => {
      this.getSearch(value);
    }, 1000);
  },

  //发送请求过去搜索数据

  async getSearch(query) {
    let res = await request("/goods/qsearch?query=" + query + "");
    console.log(res);

    this.setData({
      searchList: res.data.message,
    });
  },
  // 取消事件
  handleTapCancel() {
    this.setData({
      isShow: true,
      searchList: [],
      inputValue: " ",
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
