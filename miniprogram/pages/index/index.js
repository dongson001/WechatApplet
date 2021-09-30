//index.js
const app = getApp()

Page({
  data: {
    result : '',
    num1: null,
    num2: null,
    sum: 0
  },

  onLoad: function() {
    
  },
  bindKeyInput1(e) {
    this.setData({
      num1: e.detail.value
    })
  },
  bindKeyInput2(e) {
    this.setData({
      num2: e.detail.value
    })
  },
  tapSum() {
    console.log(this.data.num1);
    wx.cloud.callFunction({
      name: 'toSum',
      data: {
        num1: parseInt(this.data.num1),
        num2: parseInt(this.data.num2),
      },
      success: (result)=>{
        this.setData({
          sum: result.result
        })
        console.log(result);
      },
      fail:  (err)=>{
        console.log(err);
      }
    })
  },
  
  tapScanCode() {
    wx.scanCode({
      success: (res)=>{
        console.log(res);
        wx.cloud.callFunction({
          name: 'getBook',
          data: {
            isbn: res.result
          },
          success: (result)=>{
            this.setData({
              result
            })
            console.log(result);
          }
        })
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  }
})
