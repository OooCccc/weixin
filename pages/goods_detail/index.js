import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_detail: {},
    isCollect: false,
  },

  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {},
  //获取商品详细信息
  async getGoodsDetail(id) {
    const data = await request("/goods/detail?goods_id=" + id + "");
    this.GoodsInfo = data.data.message;
    //1.获取缓存中的收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //2.判断该商品是否被收藏过
    let isCollect = collect.some((v) => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goods_detail: {
        goods_id: data.data.message.goods_id,
        goods_pics: data.data.message.pics,
        goods_price: data.data.message.goods_price,
        goods_name: data.data.message.goods_name,
        goods_small_logo: data.data.message.goods_small_logo,
        goods_introduce: data.data.message.goods_introduce.replace(
          /\.webp/g,
          ".jpg"
        ),
      },
      isCollect,
    });
  },

  //处理点击图片事件
  handleTap(e) {
    const urls = this.data.goods_detail.goods_pics.map((v) => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls, // 需要预览的图片http链接列表
    });
  },
  //加入购物车事件点击事件处理
  handleTapAdd(e) {
    //1.获取缓存中购物车的数据 数组格式  确保cart是一个数组
    let cart = wx.getStorageSync("cart") || [];

    //2.判断商品对象是否存在购物车数组中
    let index = cart.findIndex(
      (v) => v.goods_id === this.data.goods_detail.goods_id
    );
    if (index === -1) {
      //1. 不存在 第一次添加
      this.data.goods_detail.num = 1;
      //是否选中
      this.data.goods_detail.checked = true;
      cart.push(this.data.goods_detail);
    } else {
      //4. 已经存在购物车数据 执行num++
      cart[index].num++;
    }
    //5. 把购物车重新加入到缓存中
    wx.setStorageSync("cart", cart);
    //6.弹窗提示
    wx.showToast({
      title: "添加成功",
      icon: "success",
    });
  },
  //收藏事件处理
  handlebindCollection() {
    let isCollect = false;
    //获取缓存中的收藏组
    let collect = wx.getStorageSync("collect") || [];
    //判断该商品是否被收藏过
    let index = collect.findIndex(
      (v) => v.goods_id === this.GoodsInfo.goods_id
    );
    if (index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: "取消收藏",
        icon: "success",
        mask: true,
      });
    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: "收藏成功",
        icon: "success",
        mask: true,
      });
    }
    //把数据存入缓存中
    wx.setStorageSync("collect", collect);
    //把数据存入data中
    this.setData({
      isCollect,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let options = pages[pages.length - 1].options;
    console.log(options);

    // let goods_id=
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
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
