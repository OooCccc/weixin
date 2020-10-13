//ajaxTime 发送请求次数
let ajaxTime = 0;
//封装一个异步请求的方法
export const request = (params, data, header, method) => {
  ajaxTime++;
  wx.showLoading({
    title: "加载中",
    //mask遮罩层 禁止用户进行其他操作
    mask: true,
  });
  //提取公共路劲
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + params,
      data: data,
      header: header,
      method: method,
      success: (data) => {
        resolve(data);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTime--;
        if (ajaxTime === 0) wx.hideLoading();
      },
    });
  });
};
