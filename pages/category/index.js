import {request} from '../../request/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 左侧分类信息
      leftMenuList:[],
      //右侧分类信息
      rightMenuList:[],
      //选中的当前的类
      currentMenu:0,
      //设置右侧页面滚条的距离
      scrollTop:0

  },

  //接口返回的数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.先判断一下本地存储中有没有旧的数据
    //2.没有旧的数据就直接发送请求
    //3.如果有旧的数据 同时 旧的数据没有过期，就使用本地存储中的旧数据即可
      //- 1
        const Cates=wx.getStorageSync('cates');
        //不存在 直接发送请求
        if (!Cates) {
              this.getCategory();
        } else {
          // 存在的话 判断事件有没有过期 
          if(Date.now()-Cates.time>1000*10){
              //重新发送请求
              this.getCategory();
          }else{
              //使用旧的数据
              console.log("info");
              this.Cates=Cates.data;
              
              //构造左侧大菜单数据
              let leftMenuList=this.Cates.map(v=>v.cat_name);
              //构造右侧大菜单数据
              let rightMenuList=this.Cates[0].children;
              this.setData({
                leftMenuList,
                rightMenuList
              })
          }
          
        }

      

    
  },
    //获取分类信息
    async getCategory(){
      // request("/categories").then(
      //   (data)=>{
      //     //得到数据
      //    this.Cates=data.data.message;
      //   //把数据存在本地存储中
      //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
      //    //构造左侧大菜单数据
      //    let leftMenuList=this.Cates.map(v=>v.cat_name);
      //    //构造右侧大菜单数据
      //    let rightMenuList=this.Cates[0].children;
      //    this.setData({
      //     leftMenuList,
      //     rightMenuList
      //    })
      //   }
      // )
      const data= await request("/categories");
        //得到数据
         this.Cates=data.data.message;
        //把数据存在本地存储中
          wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})
         //构造左侧大菜单数据
         let leftMenuList=this.Cates.map(v=>v.cat_name);
         //构造右侧大菜单数据
         let rightMenuList=this.Cates[0].children;
         this.setData({
          leftMenuList,
          rightMenuList
         })
    },
    //左侧菜单栏点击监听事件
    handleItemTap(e){
      //1.拿到事件源的index
      //2.根据index把右边的商品信息进行渲染
      let {index}=e.currentTarget.dataset;
      let rightMenuList=this.Cates[index].children;
         this.setData({
          currentMenu:index,
          rightMenuList:rightMenuList,
          //设置右侧滚动滚动条的距离
          scrollTop:0
         })
    },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})