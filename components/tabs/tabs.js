// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        list:{
          type:Array,
          value:[]
        }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTapChange(e){

      //获取tabs的index
      let {index} =e.currentTarget.dataset;
      //改变tas 的样式和内容
      
      this.triggerEvent("handleChange",{index})
    }
  }
})
