let write=require("./write");
let read=require("./read");
let request=require("request");
let dataDirPath="E://personalfile/node/crawl/src/data/";
let mkDirCount=0;
let ucgi="getUCGI8836810371758987";//周杰伦
let albumName="";
let songName="";
/**生成获取专辑信息列表的地址
 * @param ucgi 区分歌手专辑的标识
 * */
function createGetAlbumUrl(ucgi){
  let url="https://u.y.qq.com/cgi-bin/musicu.fcg?-="+ucgi+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%2C%22singerAlbum%22%3A%7B%22method%22%3A%22get_singer_album%22%2C%22param%22%3A%7B%22singermid%22%3A%220025NhlN2yWrP4%22%2C%22order%22%3A%22time%22%2C%22begin%22%3A0%2C%22num%22%3A30%2C%22exstatus%22%3A1%7D%2C%22module%22%3A%22music.web_singer_info_svr%22%7D%7D";
  return url;
};

/**生成获取对应专辑下歌曲信息列表的地址
 * @param album_mid  专辑id
 * */
function createGetMusicList(album_mid){
  let url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg?ct=24&albummid="+album_mid+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0";
  return url;
}




/**生成歌曲文件地址*/
function createGetMusicFileUrl(songmid,vkey) {
  let url="http://111.202.98.144/amobile.music.tc.qq.com/C400"+songmid+".m4a?guid=9429749972&vkey="+vkey+"&uin=0&fromtag=66";
  return url;
}
/**获取到songkey后的回调
 * */
function dealSongVkey(songvkey,info) {
    let vkey=songvkey.req_0.data.midurlinfo[0].vkey;
    let songmid=songvkey.req_0.data.midurlinfo[0].songmid;
    let url=createGetMusicFileUrl(songmid, vkey);//歌曲文件地址
    request({url,encoding:null},function (err,response,body) {
      write.writeFile(dataDirPath+info.albumName+"/",info.songName,"m4a",body,function (err) {
          if(err){
            console.log(err);
          }
        },true)
      });
}
/*找vkey的地址*/
function createGetVkeyUrl(songmid) {
  let json={
    "req":{
      "module":"CDN.SrfCdnDispatchServer",
      "method":"GetCdnDispatch",
      "param":{
        "guid":"9429749972",
        "calltype":0,
        "userip":""
      }
    },
    "req_0":{
      "module":"vkey.GetVkeyServer",
      "method":"CgiGetVkey",
      "param":{
        "guid":"9429749972",
        "songmid":[
          songmid
        ],
        "songtype":[
          0
        ],
        "uin":"0",
        "loginflag":1,
        "platform":"20"
      }
    },
    "comm":{
      "uin":0,
      "format":"json",
      "ct":24,
      "cv":0
    }
  };
  let getplaysongvkey = "getplaysongvkey" + (Math.random() + "").replace("0.", "");
  let url="https://u.y.qq.com/cgi-bin/musicu.fcg?-="+getplaysongvkey+"&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data="+encodeURIComponent(JSON.stringify(json))
  return url;
}

/**循环处理获取到的歌曲列表
 * run in getMusicList
 * */
function loopDealMusic(musicList) {
  musicList.forEach((item,index)=>{
    let info={
      albumName:item.albumname,
      songName:item.songname
    };
    read.getData(createGetVkeyUrl(item.songmid),function(songvkey){dealSongVkey(songvkey,info)});
  })
}
/**获取歌曲信息后抽出歌曲列表
 * run in loopDealAlbum
 * */
function getMusicList(musicInfo){
  let musicList=musicInfo.data.list;
  loopDealMusic(musicList);
}

/**循环专辑进行处理
 * run in getAlbumList
 * */
function loopDealAlbum(albumList) {
   albumList.forEach((item,index)=>{//循环专辑创建专辑文件夹
       if(true){
         write.makeDirectory(dataDirPath,item.album_name,(err)=>{
           if(err){
             //console.log(err);

           }else {
             mkDirCount++;
             if(mkDirCount==albumList.length){
               console.log("创建结束");
             }
           }
           read.getData(createGetMusicList(item.album_mid),getMusicList);

         },true);
       }
   })
}
/*定义处理获取到专辑信息后的事情*/
function getAlbumList(albumInfo){
  let albumList=albumInfo.singerAlbum.data.list;
  loopDealAlbum(albumList);
};


read.getData(createGetAlbumUrl(ucgi),getAlbumList);