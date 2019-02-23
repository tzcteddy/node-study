let fs=require("fs");
let path=require("path");

/*创建目录*/
module.exports={
  /**创建目录
   * @param dirPath 创建目录的路径
   * @param dirName  文件夹名称
   * @param callback 回调函数
   * @param async  是否异步创建 true异步
  * */
  makeDirectory:function (dirPath,dirName,async,callback) {
    if(dirPath.slice(dirPath.length-1)!=="/") dirPath+="/";
    if(async){
      fs.mkdir(dirPath+dirName,callback);
    }else {
      fs.mkdirSync(dirPath+dirName);
    }
  },
  /**生成文件
   * @param path 路径
   * @param name 文件名
   * @param type  文件类型
   * @param callback 回掉函数
   * @param async   是否异步 true异步
   * */

  writeFile: async function (path,name,type,data,async,callback,encoding) {
    if(path.slice(path.length-1)!=="/") path+="/";
    if(async){
      fs.writeFile(path+name+"."+type,data,encoding,callback);
    }else {
      fs.writeFileSync(path+name+"."+type,data,encoding);
    }
  }
};
