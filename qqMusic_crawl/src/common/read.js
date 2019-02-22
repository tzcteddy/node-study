let fs=require("fs");
let request=require("request");

module.exports={
  /**请求数据
   * @param url 请求的地址
   * @param callback 回调
   * */
  getData:function (url,callback) {
    request({url,encoding:null},function (err,response,body) {
      body=JSON.parse(body.toString());
      callback(body)
    })
  }
};
