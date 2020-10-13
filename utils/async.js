import { reject } from "async";

//获取用户权限状态
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
};

//获取收获地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
};

//开启权限
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
};

//弹窗提示/*
/**是否删商品
 *
 */

export const showModal = (content) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content: content,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
//弹窗提示/*
/**判断购物车和收货地址是否为空
 *
 */
export const showToast = (content) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: content,
      icon: "none",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
//获取用户登陆信息  login/*
/**判断购物车和收货地址是否为空
 *
 */
export const login = (content) => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          console.log(res.errMsg);
        }
      },
    });
  });
};

/**
 * 发起微信支付
 * @param {object} pay
 */

export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      // timeStamp: pay.timeStamp,
      // nonceStr: pay.nonceStr,
      // package: pay.package,
      // signType: pay.signType,
      // paySign: pay.paySign,
      ...pay,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      },
    });
  });
};
