import { request } from "../../request/request.js";
import { login } from "../../utils/async.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  //授权处理 获取用户信息
  async handleGetUserInfo(e) {
    console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail;
    //获取小程序登陆成功后的code
    let code = await login();
    //发送请求 获取用户的token
    wx.setStorageSync(
      "token",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    );
    // let res = await request(
    //   "/users/wxlogin",
    //   { encryptedData, rawData, iv, signature, code },
    //   "post"
    // );
    wx.navigateBack({
      dalta: 1,
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
