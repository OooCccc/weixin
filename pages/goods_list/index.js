import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 1,
        value: "综合",
        isActive: true,
      },
      {
        id: 2,
        value: "销量",
        isActive: false,
      },
      {
        id: 3,
        value: "价格",
        isActive: false,
      },
    ],
    //商品信息列表
    goodsList: [],
    //商品页数
    pageNumTotal: 1,
  },
  handleChange(e) {
    let { index } = e.detail;

    const { list } = this.data;

    list.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );

    this.setData({
      list,
    });
  },
  //请求参数
  queryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid = options.cat_id || "";
    this.queryParams.query = options.query || "";
    console.log(options);

    this.getGoodsList();
  },

  //获取请求的数据
  async getGoodsList() {
    let data = await request(
      "/goods/search?query=" +
        this.queryParams.query +
        "&cid=" +
        this.queryParams.cid +
        "&pagenum=" +
        this.queryParams.pagenum +
        "&pagesize=" +
        this.queryParams.pagesize +
        ""
    );
    //获取总条数
    const { total } = data.data.message;
    //计算总页数
    this.pageNumTotal = Math.ceil(total / this.queryParams.pagesize);
    this.setData({
      goodsList: [...this.data.goodsList, ...data.data.message.goods],
    });
    //关闭下拉刷新
    wx.stopPullDownRefresh();
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
  onPullDownRefresh: function () {
    //重置数据 数组 页码设置为1即可
    this.data.goodsList = [];
    this.queryParams.pagenum = 1;
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.queryParams.pagenum >= this.pageNumTotal) {
      wx.showToast({
        title: "没有数据了！",
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
