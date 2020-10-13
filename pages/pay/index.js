import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment,
} from "../../utils/async.js";
import { request } from "../../request/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    //总数量
    totalNum: 0,
    address: {},
    //总价格
    totalPrice: 0,
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
    let cart = wx.getStorageSync("cart") || [];
    //过滤只选中的商品
    cart = cart.filter((v) => v.checked == true);

    //计算总价格和总数量
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach((v) => {
      totalNum += v.num;
      totalPrice += v.num * v.goods_price;
    });
    //判断数组为空
    this.setData({
      carts: cart,
      totalNum,
      totalPrice,
      address: wx.getStorageSync("address"),
    });
  },
  //处理支付
  async handelApply(e) {
    try {
      const token = wx.getStorageSync("token");
      if (!token) {
        wx.navigateTo({
          url: "/pages/auth/index",
        });
        return;
      }
      console.log("已经存在token");
      //创建订单
      const header = { Authorization: token };
      //请求参数
      const order_price = this.data.totalPrice;
      const order_address = this.data.address;
      const cart = this.data.carts;
      let goods = [];
      cart.forEach((v) =>
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price,
        })
      );

      //发送请求
      let res1 = await request(
        "/my/orders/create",
        { order_price, order_address, goods },
        header,
        "POST"
      );
      let { order_number } = res1.data.message;
      //发起预支付接口
      let res2 = await request(
        "/my/orders/req_unifiedorder",
        { order_price, order_number },
        header,
        "POST"
      );
      let { pay } = res2.data.message;
      //发起微信支付
      // await requestPayment(pay);
      //查询后台订单状态
      let res4 = await request(
        "/my/orders/chkOrder",
        { order_number },
        header,
        "POST"
      );
      await showToast("订单支付成功！");
      //移除已经完成的商品 在跳转页面
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter((v) => !v.checked);
      wx.setStorageSync("cart", newCart);
      //支付成功，进行页面跳转

      wx.navigateTo({
        url: "/pages/order/index",
      });
    } catch (error) {
      await showToast("订单支付失败！");
      console.log(error);
    }
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
