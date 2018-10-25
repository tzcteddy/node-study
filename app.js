var testFn=function(){
    console.log("测试模块");
    return "来自测试模块"
}
console.log(__filename);
console.log(__dirname);
exports.test=testFn;