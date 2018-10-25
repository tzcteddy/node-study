##node

###一、REPL运行环境基础命令
命令行窗口输入 node 回车

- 1、**.break**：书写多行函数的中途想放弃该函数的书写或者重新书写时，该命令可以返回到命令提示符起点处；
- 2、**.clear**：清除REPL运行环境中上下文对象中保存的所有变量与函数，也可在书写中回到命令提示符起点处；
- 3、**.exit**：推出REPL环境，Ctrl+D组合键；
- 4、**.help**：该命令将在命令窗口中显示REPL环境中的所有基础命令；
- 5、**.save**：该命令将把在REPL运行环境中输入的所有表达式保存到一个文件中，例：.save ./app.js ；
- 6、**.load**：该命令将把某个文件中保存的所有表达式依次加载到REPL环境中；

###二、Node.js基础知识

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
        
 ####2.2、Node.js中的全局作用域和全局函数
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
- 6、__filename和__dirname

        1、__filename
        在任何模块文件内部，可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名
        app.js中输入：console.log(__filename);
        REPL环境：app=require('./app.js');
        输出：E:\personalfile\node\miao\node-study\app.js
        2、__dirname
        在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        app.js中输入：console.log(__filename);
        REPL环境：app=require('./app.js');
        输出：E:\personalfile\node\miao\node-study
        
- 7、事件处理机制
        
    1.EventEmitter类：
    
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
        
