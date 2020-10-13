import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
} from "../../utils/async.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    address: {},
    allChecked: false,
    //总数量
    totalNum: 0,
    //总价格
    totalPrice: 0,
  },
  //添加收货地址事件处理  es7
  // async handleAddAdress(e) {
  //   try {
  //     //查看权限状态
  //   const  res = await getSetting()
  //   // //1.判断用户状态 ture 和undefind 表示可以获取收货地址  fasle表示不可以
  //   let scoreAdress = res.authSetting["scope.address"];
  //   if (scoreAdress === true || scoreAdress=== undefined) {
  //     const res1= await  chooseAddress();
  //     console.log(res1);
  //   }else{
  //    await openSetting();
  //    const res2=await  chooseAddress();
  //     console.log(res2);
  //   }
  //   } catch (error) {
  //     console.log(error);
  //   }

  // },

  //添加收货地址事件处理  es6
  handleAddAdress(e) {
    getSetting()
      .then((res) => {
        let scoreAdress = res.authSetting["scope.address"];
        if (scoreAdress === true || scoreAdress === undefined) {
          return chooseAddress();
        } else {
          return openSetting();
        }
      })
      .then((res) => {
        console.log(res);
        //把数据存放到本地存储中
        wx.setStorageSync("address", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //减少数量处理
  async handelDelGoods(e) {
    let cart = wx.getStorageSync("cart");
    let { index } = e.currentTarget.dataset;
    cart[index].num--;

    if (cart[index].num < 1) {
      cart[index].num = 1;

      let res = await showModal("是否删除该商品");
      if (res.confirm) {
        console.log("用户点击确定");
        cart[index].num = 0;
        //移除商品信息
        cart.splice(index, 1);
        //更新data和缓存中的数据
        this.setCart(cart);
      } else if (res.cancel) {
        console.log("用户点击取消");
      }
    }
    this.setCart(cart);
  },
  //增加数量处理
  handelAddGoods(e) {
    let cart = wx.getStorageSync("cart");
    let { index } = e.currentTarget.dataset;
    cart[index].num++;
    this.setCart(cart);
  },

  //全选事件处理
  handleAllSelect(e) {
    //获取购物车的商品信息和选中状态
    let { carts, allChecked } = this.data;
    //遍历数组，将allChecked取反即可
    allChecked = !allChecked;
    //循环修改数组里面的值
    carts.forEach((v) => (v.checked = allChecked));
    //重新放进data和缓存中
    this.setCart(carts);
  },
  //复选框事件处理
  handelChange(e) {
    let goodsId = e.currentTarget.dataset.id;
    //获取购物车数组
    console.log(goodsId);
    let cart = this.data.carts;
    //找到须要修改的对象
    let index = cart.findIndex((v) => v.goods_id === goodsId);
    //选中状态取反
    console.log(cart[index]);

    cart[index].checked = !cart[index].checked;
    //把数据重新设置到data和缓存中
    this.setCart(cart);
  },
  //点击结算 支付

  async handelApply(e) {
    //1.判断有没有添加收货地址 进行弹窗提示
    if (this.data.address == "") {
      await showToast("你还没有添加收货地址!");
      return;
      //2.判断有没有商品信息 进行弹窗提示
    } else if (this.data.totalNum === 0) {
      await showToast("你还没有添加任何商品!");
      return;
    } else {
      //3.跳转到支付页面
      wx.navigateTo({
        url: "/pages/pay/index",
      });
    }
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
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
    this.setData({
      address: wx.getStorageSync("address"),
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
  //更新data和缓存中的数据
  setCart(cart) {
    wx.setStorageSync("cart", cart);
    let allChecked = true;
    //计算总价格和总数量
    let totalNum = 0;
    let totalPrice = 0;
    cart.forEach((v) => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.num * v.goods_price;
      } else {
        allChecked = false;
      }
    });
    //判断数组为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      carts: cart,
      totalNum,
      totalPrice,
      allChecked,
    });
  },
});
