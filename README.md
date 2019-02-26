## node

### 一、REPL运行环境基础命令
命令行窗口输入 node 回车

- 1、**.break**：书写多行函数的中途想放弃该函数的书写或者重新书写时，该命令可以返回到命令提示符起点处；
- 2、**.clear**：清除REPL运行环境中上下文对象中保存的所有变量与函数，也可在书写中回到命令提示符起点处；
- 3、**.exit**：推出REPL环境，Ctrl+D组合键；
- 4、**.help**：该命令将在命令窗口中显示REPL环境中的所有基础命令；
- 5、**.save**：该命令将把在REPL运行环境中输入的所有表达式保存到一个文件中，例：.save ./app.js ；
- 6、**.load**：该命令将把某个文件中保存的所有表达式依次加载到REPL环境中；

### 二、Node.js基础知识

#### 2.1、Node.js中的控制台
- 1、console.log方法

        1、进行标准输出流的输出，即在控制台输出一行字符串，可以将它重定向输出到文件中；
        例：node app.js 1>info.log
        2、可以在此方法中通过修改参数指定输出字符串的格式
            //从第二个参数开始依序输出所有字符串
            console.log("%s","hoge","foo");  //输出结果 hoge  foo
            //将对象转换为字符串后输出
            console.log("%s","hoge",{foo:"Foo"}); //输出结果 hoge ({foo:"Foo"})
            //将数值转换为字符串后输出
            console.log("%d",10,20.9); //输出结果 10 20.9
            //将字符串转换为字符串输出
            console.log("%d","hoge"); //输出结果 NaN
            //输出百分号
            console.log("%%","hoge");  //输出结果  % hoge

- 2、console.error方法

        1、进行错误标准输出流的输出,可以将它重定向输出到文件
        例：node app.js 2>error.log

- 3、console.dir方法

        用于查看一个对象的内容并将该对象的信息输出到控制台
- 4、console.time方法和console.timeEnd方法

        统计一段代码的执行时间，两个方法均使用一个参数，参数值可以为任意字符串，但是两个方法使用的参数字符串必须相同；
        console.time("small loop");
        for (var i=0;i<1000;i++){};
        console.timeEnd("small loop");

- 5、console.trace方法

        用于将当前位置处的栈信息作为标准错误信息进行输出，参数值可以为任意字符串，用于标识此处输出的错误标准信息。
        console.trace('错误信息')
- 6、console.assert方法
        
        用于对一个表达式的执行结果进行评估，如果执行结果为false，则输出一个消息字符串，并抛出AssertionError异常。
        console.assert(1==2,"raise an exception")
        
 #### 2.2、Node.js中的全局作用域和全局函数
- 1、global：Node.js全局命名空间
- 2、setTimeout函数和clearTimeout函数
 
        setTimeout使用方法：
        var timer=setTimeout(callback,ms,[arg],[......])
        callback:回调函数;
        ms:一个整数，指定经过多少毫秒后执行callback，1—2147483647之间，广义不超过24.8天，过大自动归1；
        [arg]:callback参数;
        clearTimeout(timer);
- 3、setInterval函数和clearInterval函数【用法同上】
- 4、定时器对象的unref方法和ref方法

        unref:
        取消setTimeout或setInterval方法中回调函数的调用
        var testFn=function(){};
        var timer=setTimeout(testFn,3000);
        timer.unref();
        ref:
        回复回调函数的调用
        timer.ref();
- 5、与模块相关的全局函数及对象

        1、require函数加载模块
            require("./testModule.js");
        2、查询完整模块名
            require.resolve("./app.js");
            'E:\\personalfile\\node\\node-study\\app.js'
        3、缓存了所有已被加载模块的缓存区
            require.cache
            此对象具有一个"键名/键值"结构，键名为每个模块的完整文件名，键值为各模块对象，可以通过键名来访问某一模块；
            require.cache["模块文件名"]
            console.log(require.cache[require.resolve("./app.js")]);
            使用delete删除缓存区缓存的某个模块对象
            delete require.cache[require.resolve("./app.js")];
#### 2.3、__filename和__dirname

- 1、__filename

        在任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名
        app.js中输入：console.log(__filename);
        REPL环境：app=require('./app.js');
        输出：E:\personalfile\node\miao\node-study\app.js
- 2、__dirname

        在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        app.js中输入：console.log(__filename);
        REPL环境：app=require('./app.js');
        输出：E:\personalfile\node\miao\node-study
        
#### 2.4、事件处理机制
        
- 1.EventEmitter类：
    
|方法与参数 |描述 |
| :-------- | :--------|
|addListener(event,listener)|对指定事件绑定事件处理函数|
 |on(event,listener)|对指定事件绑定事件处理函数,(addListener方法的别名)|
 |once(event.listener)|对指定事件指定只执行一次的事件处理函数| 
 |removeListener(event,listener)|对指定事件解除事件处理函数|
 |removeAllListeners([event])|对指定事件解除所有事件处理函数|
 |setMaxListeners(n)|指定事件处理函数的最大数量。n为整数值|
 |listeners(event)|获取指定事件所有的事件处理函数|
 |emit(event,[arg1],[arg2],[...])|手工触发指定事件|
 |EventEmitter.listenerCount(emitter,event)|类自身拥有的方法，获取指定事件的事件处理函数的数量|  
 
#### 2.5在Node.js中使用调试器

+ 1、在命令窗口使用**node debug app.js**命令调试文件
        
        在Node.js中提供了一个可以通过简单TCP协议来访问的调试器。在使用"node debug"命令后，首先链接该调试器，当调试器可以使用后，命令窗口出现一个"debugger"命令提示符，后跟ok；
        接下来，Node.js将在脚本文件的第一行可运行代码之前暂停脚本文件的执行，命令行窗口出现"break in"+脚本文件完整文件名+":"+可运行代码的行序号，用于标识脚本代码中的暂停位置；
        
+ 2、"cont"或"c"命令，("continue"的简写)
 
        如果需要执行当前被暂停执行的脚本，可在debug命令后输入"cont"或"c"命令，继续执行剩余脚本代码。
        
+ 3、"next"或"n"命令
    
        如果不需要执行完剩余所有脚本代码，可以在debug命令后输入"next"或"n"命令，将程序执行到下一句可执行代码之前。
        
+ 4、"step"或"s"命令

        由于next命令以一句可执行代码为一个单位，因此在执行"var i=foo();"这种调用函数的代码时，调试器不会进入到函数内部，而是直接显示返回的结果，输入"step"或"s"后，程序将暂停在函数内第一行代码之前，可继续使用"next"逐行执行。
        
+ 5、"out"或"o"命令

        在函数内部逐行执行的时候，可以使用"out"或"o"命令立即执行完函数内剩余所有代码，程序将被暂停在调用该函数的代码之后的下一句代码之前。
        
+ 6、watch("观察时使用的表达式")
+ 7、watchers：查看所有观察表达式的运行结果或变量的变量值
+ 8、unwatch("观察时使用的表达式")：解除观察
+ 9、setBreakpoint(filename,line)或sb(filename,line)设置断点

        第一个参数用于指定需要设置断点的脚本文件名，第二个参数用于指定将断点设置在第几行。
        
+ 10、clearBreakpoint(filename,line)或cb(filename,line)取消断点
+ 11、backtrace或bt

        当使用调试器在深层函数内部进行调试的时候，可以使用backtrace或bt命令查看该函数及其外层各函数的返回位置，包括返回代码的行号及起始字符所在位置。
        
+ 12、list

        调试过程中使用list查看所要执行代码之前或之后的几行代码。
        
+ 13、repl 从调试进入到REPL运行环境
+ 14、restart 重新开始脚本调试
+ 15、kill 终止脚本文件调试
+ 16、run kill终止后，可以使用run命令重新开始脚本文件调试
+ 17、scripts 查看当前正在运行的文件及所有被加载的模块文件名称(不包含Node.js的内置模块)。
+ 18、version 显示Node.js引擎版本号

### 三、模块与npm包管理工具

#### 1、exports与module.exports
- 1、使用exports对象

        foo.js
        var name="tzc";
        var getName=function(){
            return name
        };
        exports.name=name;
        exports.getName=getName;
        模块外访问
        var foo=require("./foo.js");
        console.log(foo.name);
        console.log(foo.getName());:
        
- 2、模块定义为类

        在文件中也可以将exports对象书写为module.exports，但是在需要将模块定义为一个类时，只能使用module.exports的书写方式
        
#### 2、组织与管理模块

- 1、从node_modules目录中加载模块

        如果在require函数中只是用指定文件名，但不指定路径，
        如：require("bar.js");
        Node.js将该文件视为node_modules目录下的一个文件；
        "/home/ry/project/node_modules/app.js"中使用require("bar.js")；模块使用的加载路径依次为：
        "/home/ry/project/node_modules/bar.js"
        "/home/ry/node_modules/bar.js"
        "/home/node_modules/bar.js"
        "/node_modules/bar.js"
        
- 2、使用目录来管理模块

        在Node.js中可以将目录名指定为模块名，以便通过目录来管理模块，只需为该目录指定一个入口点；
        方法一、在应用程序的根目录下创建一个node_modules子目录，然后在其中为模块创建一个目录，并且在其中放入一个index.js;
        方法二、更灵活，在应用程序根目录下的node_modules子目录下创建一个package.json文件，并且在其中使用一下代码创建模块名与主文件：
        {
            "name":"foo",
            "main":"./lib/foo.js"
        }
        当使用var foo=require("foo")加载foo模块的时候，将加载foo子目录下的lib目录下的foo.js模块文件
        
- 3、模块对象的属性

        1、module.id
            属性值为当前模块的ID，主模块的id为"."，其他为该模块文件的绝对路径，文件中可修改当前模块id
        2、module.filename
            属性值为当前模块的文件袋的文件名
        3、module.loaded
            属性值为布尔值，false表示模块尚未加载完毕
        4、module.parent
            属性值为当前模块的父模块对象，即调用当前模块的模块对象
        5、module.children
            属性值为一个数组，存放了当前模块的所有子模块对象，即当前模块中已加载的所有模块对象

- 4、包与npm包管理工具

        1、Node.js中的包
        
            一个包事实上就是一个目录，通常包含如下所示一些内容：
            1）在包的根目录中存放package.json文件
            2）在bin子目录中存放二进制文件
            3）在lib子目录中存放javascript文件
            4）在doc子目录下存放对包或包的使用方法进行说明的文档文件
            5）在test目录中存放一些对包进行单元测试用的文件
            一个package.json文件中通常包含的字段及其作用如下：
            1）name:包名，唯一的，由小写字母、下划线和数字组成，不含空格
            2）preferglobal：是否支持全局安装，true为支持
            3）description:包说明
            4）version:版本号
            5）author:作者信息数组 name email字段
            6）maintainers:包的维护者信息数组
            7）bugs:bug的提交地址
            8）licenses:许可证数组，type许可证名称 url许可证文本链接
            9）repository:仓库托管地址数组 type:git url:地址
            10）keywords:关键字数组
            11）dependencies:本包所依赖的包
            
### 四、使用Buffer类处理二进制数据

#### 4.1、创建Buffer对象

>命令窗口中使用十六进制数值来显示其中的二进制数据

- 1、长度创建

        ·只需将缓存区的大小(以字节为单位)指定为构造函数的参数
        new Buffer(size)
        
        ·被创建的Buffer对象拥有一个 length 属性，属性值为缓存区大小
        var buffer=new Buffer(12);
        buffer.length  //12
        
        ·可以使用Buffer对象的fill方法来初始化缓存区中的所有内容
        buffer.fill(value,[offset],[end]);
        第一个参数为必须指定的参数，数值为需要被写入的数值；
        第二个参数可选，用于指定从第几个字节处开始写入被指定的数值，m默认为0；
        第三个参数可选，用于指定将数值一直写入到第几字节处，默认为Buffer对象的大小
        
        
- 2、数组创建

        使用一个存放了需要被指定 数值 的数组来作为构造函数的参数
        new Buffer(array)
        new Buffer([100,23]);
        
        
- 3、字符串创建

        直接使用一个字符串来初始化缓存区
        new Bufer(str,[encoding])
        第一个参数为必须指定的参数，参数值为用于初始化缓存区的字符串；
        第二个参数值为一个用于指定文字编码格式的字符串，默认"utf8";
        
     Node.js中可利用的编码
     
     |编码|说明|
     |:---|:---|
     |ascii|ASCII字符串|
     |utf8|UTF-8字符串|
     |utf16le|UTF-16LE字符串|
     |ucs2|UCS2字符串|
     |base64|经过BASE64编码后的字符串|
     |binary|二进制数据(不推荐使用)|
     |hex|使用16进制数值表示的字符串|
     
#### 4.2、字符串的长度与缓存区的长度

> 在Node.js中，一个字符串的长度与根据该字符串创建的缓存区的长度并不相同，因为在计算字符串长度的时候，以文字作为一个单位，而在计算缓存区的长度时，以字节作为一个单位。

    var str="我爱中国";
    var buf=new Buffer(str);
    <Buffer e6 88 91 e7 88 b1 e4 b8 ad e5 9b bd>
    
    str.length //4
    buf.length //12
    
    可以取出字符串对象或缓存区中的数据，获取也是字符串以文字作为一个单位，缓存区以字节作为一个单位；
    str[2]取到第三个文字
    buf[2]取到缓存区第三个字节数据转换为整数后的数值
    
    另外，字符串创建后不可被修改，而Buffer对象是可以被修改的；
    str[2]='去'
    str  //我爱中国
    buf[2]=0
    <Buffer e6 88 00 e7 88 b1 e4 b8 ad e5 9b bd>
    
    Buffer对象的slice方法
    buf.slice(2,4)
    <Buffer 00 e7>
    由于Buffer对象的slice方法并不是复制缓存区的数据，而是与该数据共享内存区域，因此，如果修改使用slice方法取出的数据，则缓存中的数据也将被修改；
    
#### 4.3、Buffer对象与字符串对象之间的互相转换
- 1、Buffer对象的toString方法


     buf.toString([encoding],[start],[end])
    在Buffer的toString方法中可以使用三个可选参数，其中第一个用于指定Buffer对象中保存的文字编码格式，默认是utf8；第二个及第三个用于指定被转换数据的起始位置与终止位置，以字节为单位。
- 2、Buffer对象的write方法


    buf.write(string,[offset],[length],[encoding])
    在Buffer的write方法中使用四个参数，其中一个参数为必须指定参数，指定需要写入的字符串，后三个为可选参数；第二个参数offset与第三个参数length用于指定字符串转换为字节数据后的写入位置，字节数据的书写位置为从第1+offset个字节开始到offset+length个字节为止；
    第四个参数指定写入字符串时使用的编码格式，默认为utf8格式。

- 3、StringDecoder


    var StringDecoder=require("string_decoder").StringDecoder;
    var decoder=new StringDecoder([encoding])
    decoder.write(buffer);
    StringDecoder对象的write方法，可以使用一个参数，用于指定需要被转换的Buffer对象，该方法返回转换后的字符串。
#### 4.4、Buffer对象与数值对象之间的互相转换

#### 4.5、Buffer对象与JSON对象之间的互相转换


    在Node.js中，可以使用JSON.stringify方法将Buffer对象中保存的数据转换为一个字符串，也可以使用JSON.parse方法
    将一个经过转换后的字符串还原为一个数组
    > var buf=new Buffer("元宵节快乐")
    > var json=JSON.stringify(buf)
    > json
    '{"type":"Buffer","data":[229,133,131,229,174,181,232,138,130,229,191,171,228,185,144]}'
    > JSON.parse(json)
    { type: 'Buffer',
      data:
       [ 229, 133, 131, 229, 174, 181, 232, 138, 130, 229, 191, 171, 228, 185, 144 ] }
    > var copy=new Buffer(JSON.parse(json).data)
    > copy
    <Buffer e5 85 83 e5 ae b5 e8 8a 82 e5 bf ab e4 b9 90>
    > copy.toString()
    '元宵节快乐'
#### 4.5、复制缓存数据

    
    buf.copy(targetBufer,[targetStart],[sourceStart],[sourceEnd])
    当需要将Buffer对象中保存的二进制数据复制到另一个Buffer对象中时，可以使用Buffer对象的copy方法
    第一个参数为必须指定的参数，用于指定复制的目标Buffer对象；
    第二个参数用于指定目标Buffer对象中从第几个字节开始写入数据，参数值为一个小于目标Buffer对象长度的整数值，默认值0(从开始处写入数据)；
    第三个参数用于指定从复制源Buffer对象中获取数据时的开始位置，默认为0，即从复制源的第一个字节开始获取；
    第四个参数用于指定从复制源Buffer中获取数据时的结束位置，默认是复制源Buffer对象的长度。
        
 #### 4.6、Buffer类的类方法
 
 - 1、isBuffer方法
 > 判断一个对象是否为一个Buffer对象，为Buffer返回true
 
    使用方法：
      Buffer.isBuffer(obj)
 - 2、byteLength方法
 > 使用此方法计算一个指定字符串的字节数
 
    使用方法：
        Buffer.byteLength(str,[encoding])
        str:必须，要计算字节数的字符串
        encoding:非必须，编码格式，默认utf8
 - 3、concat方法
 > 用于将几个Buffer对象结合创建一个新的Buffer对象
 
    使用方法：
        Buffer.concat(list,[totalLength])
        list:必须，一个存放了多个Buffer对象的数组
        totalLength:非必须，指定被创建的Buffer对象的总长度，省略时为数组中Buffer对象的合计值
 - 4、isEncoding方法
 > 该方法用于检测一个字符串是否为一个有效编码的格式的字符串
 
    使用方法：
        Buffer.isEncoding(str);
        str:必须，指定被检测的字符串
        该字符串是有效编码格式的字符串则返回true
 
    
    
### 五、在Node.js中操作文件系统
> 
#### 5.1、对文件执行读写操作

- 1、文件的完整读写
             
     
    异步【读】：   
    fs.readFile(filename,[option],callback)
    
    filename:必须，指定读取文件的完整文件路径及文件名；
    option:非必须，对象
       flag:指定对该文件执行什么操作
       encoding:指定使用何种编码格式来读取文件
    callback:必须，function(err,data){}
    
    同步【读】：
    fs.readFileSync(filename,[option])
    
    异步【写】
    fs.writeFile(filename,data,[encoding],callback)
    filename:必须，指定需要被写入文件的完整路径及文件名
    data:必须，指定写入的内容，可以为一个字符串或一个Buffer对象
    option:非必须，对象
        flag:指定对该文件执行什么操作,默认"w"
        mode:指定文件被打开时对该文件的读写权限，默认值0666(可读写)
            第一个数必须是0
            第二个数用于规定文件或目录所有者的权限
            第三个数规定文件或目录所有者所属用户组的权限
            第四个数规定其他人的权限
            1：执行权限
            2：写权限
            4：读权限
            符合权限相加即可，例如读写权限4+2=6；
        encoding：指定使用何种编码格式来写入文件
    callback:function(err){}
    
    同步【写】
    fs.writeFileSync(filename,data,[encoding])
    
    在将一个字符串回一个缓存区中的数据追加到文件底部时
    异步【追加】
    fs.appendFile(filename,data,[encoding],callback)
    
    flag值默认为"a"
    
    同步【追加】
    fs.appendFileSync(filename,data,[encoding])
    
- flag的值

|flag值|意思|  
| --- | --- |
|"r"|读取文件，如果文件不存在则抛出异常|
|"r+"|读取并写入文件，如果文件不存则抛出异常|
|"rs"|以同步方式读取文件并通知操作系统忽略本地文件系统缓存，问价不存在抛出异常，对性能有一定影响|
|"w"|写入文件，如果文件不存在则创建该文件，如果文件存在则清空文件内容|
|"wx"|作用与"w"类似，但是以排他方式写入|
|"w+"|读取并写入文件，如果文件不存在则创建该文件，如果文件存在则清空文件内容|
|"wx+"|作用与"w+"类似，但是以排他方式写入|
|"a"|追加写入文件，如果文件不存在则创建文件|
|"ax"|作用与"a"类似，但是以排他方式写入|
|"a+"|读取并追加写入文件，如果文件不存在则创建该文件|
|"ax+"|作用与"a+"类似，但是以排他方式写入|

- 2、从指定位置读写文件

    
    异步【打开文件】
    fs.open(filename,flags,[mode],callback)
    
    filename:必须
    flags:必须
    mode:非必须
    callback:function(err,fd){}
        err:错误对象
        fd:一个整数值，代表打开文件时返回的文件的描述符
    
    同步【打开文件】
    fs.openSync(filename,flags,[mode])
    
    打开文件后，可以在回调函数中使用fs的read方法或readSync方法从文件的指定位置读取文件；
    也可以使用fs的write方法或writeSync方法从文件的指定处开始写入数据。
    
    【read方法】：该方法从文件指定位置处读取文件，一直读到文件底部，然后将读取到的内容输出到一个缓存区中。
    fs.read(fd,buffer,offset,length,position,callback)
    
    fd:必须，open方法回调函数中或openSync返回的文件描述符
    buffer:必须，参数值为一个Buffer对象，用于指定将文件数据读取到哪个缓存区中；
    offset:必须，整数，用于指定向缓存区中写入数据时的开始写入位置（以字节为单位）；
    length:必须，整数，指定从文件中读取的字节数；
    position:必须，整数，指定读取文件时的开始位置（以字节为单位）；
    callback:function(err,bytesRead,buffer){}
        bytesRead:整数值，代表实际读取的字节数（由于文件开始读取的位置+指定读取的字节数可能大于文件长度）
        buffer:代表被读取的缓存区的对象
      【同步】  
     fs.readSync(fd,buffer,offset,lenth,position),返回bytesRead;
     
     【write方法】:该方法从一个缓存区中读取数据并从文件的指定处开始写入这些数据
     fs.write(fd,buffer,offset,length,position,callback)
    fd:open方法回调函数中或openSync返回的文件描述符
    buffer:用于指定从哪个缓存区中读取数据
    offset:用于指定从缓存区中读取数据时的开始位置（以字节为单位）
    length:用于指定从缓存区中读取的字节数
    position:用于指定写入文件时的开始位置
    callback:function(err,written,buffer){]
        written:整数值，代表被写入的字节数；
        buffer:代表被读取的缓存区的对象
    
     【同步】
    fs.writeSync(fd,buffer,offset,length,position)
    
    对文件读写操作完成后，我们通常要关闭文件，尤其以排他方式被打开时
    
    异步【关闭文件】
    fs.close(fd,[callback])
    fd：必须为open方法回调函数中或openSync返回的文件描述符
    
    同步【关闭文件】
    fs.closeSync(fd)
    
#### 5.2、创建与读取目录

- 1、创建目录

    
    【异步】
    fs.mkdir(path,[mode],callback)
    
    path:必须，指定需要被创建的目录完整路径及目录名
    mode:非必须，默认0777
    callback:必须，function(err){}
    【同步】
    fs.mkdirSync(path,[mode])
    
- 2、读取目录

    
    【异步】
    fs.readdir(path,callback)
    
    path:必须，指定需要被创建的目录完整路径及目录名
    callback:function(err,files){}
        files:数组，存放了读取到的文件中的所有文件名
    
    【同步】
    fs.readdirSync(path)
    
    
#### 5.3、查看与修改文件或目录的信息

    
   

