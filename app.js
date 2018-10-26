/*var testFn=function(){
    console.log("测试模块");
    return "来自测试模块"
}
console.log(__filename);
console.log(__dirname);*/
/*类模块*/
var _name,_age;
var name='',age=0;
var foo=function(name,age){
    _name=name;
    _age=age;
};
foo.prototype.getName=function(){
    return _name;
}
foo.prototype.setName=function(name){
    _name=name;
}
foo.prototype.getAge=function(){
    return _age;
}
foo.prototype.setAge=function(age){
    _age=age;
}
foo.prototype.name=name;
foo.prototype.age=age;
module.exports=foo;