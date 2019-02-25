let write=require("./write");
let read=require("./read");
let request=require("request");
let dataDirPath="E://personalfile/node/crawl/src/data/";
let mkDirCount=0;
let fileCount=0;
let sucCount=0;
let singermid='0025NhlN2yWrP4';//周杰伦

/**
 * 生成获取单曲列表的地址
 * @param singermid 歌手的标识
 * @param pageNum  获取几条
 * */
function createGetMusicListUrl(singermid,pageNum) {
  let url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&ct=24&singermid="+singermid+"&order=listen&begin=0&num="+pageNum+"&songstatus=1"
  return url;
};

/**
 * 生成歌曲文件地址
 * @param http  链接前缀 例：http://111.202.98.144/amobile.music.tc.qq.com
 * @param songmid 歌曲的标识
 * @param vkey  关键信息
 * */
function createGetMusicFileUrl(http,songmid,vkey) {
/*
  let url="http://111.202.98.144/amobile.music.tc.qq.com/C400"+songmid+".m4a?guid=9429749972&vkey="+vkey+"&uin=0&fromtag=66";
*/
  let url=http+"C400"+songmid+".m4a?guid=9429749972&vkey="+vkey+"&uin=0&fromtag=66";
  return url;
}
/**
 * 获取到songkey后的回调
 * @param songvkey  获取歌曲的关键信息，包含vkey等其他信息
 * @param info 歌曲的基本信息,从循环出的每条歌曲信息中获取
 * */
function dealSongVkey(songvkey,info) {
  let url='';
  if(songvkey.req_0.data){
    let vkey=songvkey.req_0.data.midurlinfo[0].vkey;
    let songmid=songvkey.req_0.data.midurlinfo[0].songmid;
    //let url=createGetMusicFileUrl(songmid, vkey);//歌曲文件地址
     url=songvkey.req.data.freeflowsip[1]+songvkey.req_0.data.midurlinfo[0].purl;//有时文件地址域名不同，所以使用拼接
  }else {
    let http=songvkey.req.data.freeflowsip[1];

     url=createGetMusicFileUrl(http,info.songmid,songvkey.req.data.vkey)
  }

  request({url,encoding:null},function (err,response,body) {
    write.writeFile(dataDirPath,info.songName,"m4a",body,true,function (err) {
      if(err){
        console.log(err);
      }else {
        sucCount+=1;
        console.log("ok 【" + info.albumName + "】" + info.songName);
        if(sucCount==fileCount){
          console.log("任务完成");
        }
      }
    })
  });
}

/**
 * 找vkey的地址
 * @param songmid 歌曲的标识
 * */
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

/**
 * 循环处理获取到的歌曲列表
 * run in getMusicList
 * @param musicList 获取到的歌曲列表
 * */
function loopDealMusic(musicList) {
  fileCount+=musicList.length;
  musicList.forEach((item,index)=>{
    let info={//此处和专辑中获取的不同
      albumName:item.musicData.albumname,
      songName:item.musicData.songname,
      songmid:item.musicData.songmid
    };
    read.getData(createGetVkeyUrl(item.musicData.songmid),function(songvkey){dealSongVkey(songvkey,info)});
  })
}
/**
 * 获取歌曲信息后抽出歌曲列表
 * run in loopDealAlbum
 * @param musicInfo 获取到专辑的歌曲信息，包含歌曲列表
 * */
function getMusicList(musicInfo){
  write.makeDirectory(dataDirPath,musicInfo.data.singer_name,true,err=>{
    if(err){
      console.log(err);
    }else {
      dataDirPath=dataDirPath+musicInfo.data.singer_name+"/";
    }
  });
  let musicList=musicInfo.data.list;
  loopDealMusic(musicList);
}

//获取单曲列表
read.getData(createGetMusicListUrl(singermid,5),getMusicList);
