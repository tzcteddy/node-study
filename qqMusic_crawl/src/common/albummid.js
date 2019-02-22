var albummid = {
  "001CnPE31iJ899":"不爱我就拉倒",
  "003bSL0v4bpKAx":"等你下课",
  "003RMaRI1iFoYd":"床边的故事",
  "001uJFiE0tbGGa":"英雄",
  "001uqejs3d6EID":"哎呦，不错哦",
  "003b9EXT2QU0T7":"黄俊郎的黑",
  "003Ow85E3pnoqi":"十二新作",
  "003KNcyk0t3mwg":"惊叹号",
  "000bviBl4FjTpO":"跨时代",
  "002Neh8l0uciQZ":"摩杰座",
  "002eFUFm2XYZ7z":"我很忙",
  "002pPeJ54P94c0":"黄金甲",
  "002jLGWe16Tf1H":"依然范特西",
  "000OixvE1YjIqd":"霍元甲",
  "0024bjiL2aocxT":"十一月的萧邦",
  "003DFRzD192KKD":"七里香",
  "000MkMni19ClKG":"叶惠美",
  "004MGitN0zEHpb":"八度空间",
  "000I5jJB3blWeN":"范特西",
  "000f01724fd7TH":"Jay"
};
module.exports=albummid;
let request=require("request");
let url="http://111.202.98.144/amobile.music.tc.qq.com/C400001mhQbn2eKHiR.m4a?guid=9429749972&vkey=DE9E751898B91CE81B93F72861249C389976F2517BFF8A0DE02AFB33D4EE4BE6089978088541B580A9AEAEB3965EA5AC10C2625F3CD94C7A&uin=0&fromtag=66"
request({url,encoding:null},function (err,response,body) {
  console.log(body);
})