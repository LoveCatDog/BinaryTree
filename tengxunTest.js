/**
 * 1.js题目：用js实现代码，找出2个数组里相同的元素。 
 * @param {*} a 
 * @param {*} b 
 */
function sameValue(a, b) {
    var result = new Array();
    var c = b.toString();
    for (var i = 0; i < a.length; i++) {
        if (c.indexOf(a[i].toString()) > -1) {
            result.push(a[i]);
        }
    }
    return result;
}

/**
 * 2.js题目：判断数字是否为对称数，比如121，1331，111。
 * @param {*} num 
 */

function isReverse(num) {
    var sNum = String(num).split('').reverse().join('') - 0;
    return sNum === num;
}

/**
 * 3.js题目： 获取一个字符串的真实长度， 中文当作2个字符长度。
 * @param {*} str 
 */

function getStringLength(str) {
    var l = str.length;
    var leng = 0;
    for (i = 0; i < l; i++) {
        /**
         * charCodeAt() 方法可返回指定位置的字符的 Unicode 编码,例如，可用来判断在I处的字符是中文还是英文！
         */
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            leng++;
        }
        leng++;
    }
    return leng
}

/**
 * 4. js题目：实现一个js方法appendParams，可以给url加上多个新的参数，多考虑兼容性。
用法例如appendParams('http://url', {a:1,b:2})返回http://url?a=1&b=2。 若url包含？ 
 *
 * @param {*} url 
 * @param {*} obj 
 */
// TODO 哈希（#)


function appendParams(url, obj) {
    let newArray = []
    for (let [key, value] of Object.entries(obj)) {
        newArray.push(key + '=' + value)
    }
    newArray = newArray.join('&')
    // ?
    if (url.indexOf('?') > -1) {
        return url + newArray
    } else {
        return url + '?' + newArray
    }

}

/**
 * 5. js题目：给一个时间戳，计算出这个时间戳对应当月的第一天0点0分0秒的时间戳
 * @param {*} nowTime 时间戳
 */

function getTime(timer) {
    let nowTimeDate = new Date(timer);
    let newTimeDate = nowTimeDate.setHours(0, 0, 0, 0); //获取该天的第一天0点0分0秒的时间
    let realTime = new Date(newTimeDate).getTime();
    return realTime
}

/**
 * 6. js题目： 实现一个发布订阅模式示例： 实现一个pubSub类， 当执行pubSub.subscribe(事件名, 处理方法) 可以订阅某个事件，
  当执行pubSub.publish(事件名, 数据) 的时候可以发布某个事件。
 */

var pubsub = (function () {
    var q = {}
    topics = {},
        subUid = -1;
    //发布消息
    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return;
        }
        var subs = topics[topic],
            len = subs.length;
        while (len--) {
            subs[len].func(topic, args);
        }
        return this;
    };
    //订阅事件
    q.subscribe = function (topic, func) {
        topics[topic] = topics[topic] ? topics[topic] : [];
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };
    return q;
})();
//触发的事件
var logmsg = function (topics, data) {
    console.log("logging:" + topics + ":" + data);
}
//监听指定的消息'msgName'
var sub = pubsub.subscribe('msgName', logmsg);
//发布消息'msgName'
pubsub.publish('msgName', 'hello world');
//发布无人监听的消息'msgName1'
pubsub.publish('anotherMsgName', 'me too!');

/**
 * 1、原生js去重(数组中的类型不同，考虑去重)
 * @param {Array} arr 
 */

 function arrayUnique(arr){
   let obj = {},
       newArr = [],
       value;
    for (let i = 0; i < arr.length; i++) {
        value = arr[i];
        if (!obj[value]) {
            obj[value] = value;
            newArr.push(value);
        }
    }
    return newArr;
}

/**
 * 2、原生js去重(数组中的类型不同，不考虑去重)在
 外循环表示从0—arr.length，内循环表示从i+1到 arr.length，将没有重复的值push到数组中，内层循环检查到有重复值（同值同类型），用i＋＋跳过，然后继续使用内层循环检查外循环的下一个值
 * @param {Array} arr 
 */
function arrayUniqueType(arr){
   let newArr=[];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if(arr[i]==arr[j]){
         i=i+1;
      }
    }
      newArr.push(arr[i]);
  }
  return newArr;
}


 // 2.对象属性的逐一赋值

 function Person(name, age, dog) {
     this.name = name;
     this.age = age;
     this.say = function () {
         console.log(this.name, this.age);
     };
     this.dog = dog;
 }
 var p2 = new Person();//对象中的属性和方法赋值

var p1 = new Person("wujia", 18,'旺财');
//  var p2 = p1;//对象之间的直接赋值，本质上p1和p2都指向同一个存储空间(同一个栈空间)，无论修改p1还是p2都会影响另一个对象（浅拷贝）


//  function copy(o1, o2){
//      for(var key in o1){ //遍历对象的值
        
//          o2[key] = o1[key];//值赋值过去
//      }
//  }

//   copy(p1, p2);

    function deepCopy(o1, o2){
        // 取出第一个对象的每一个属性
        for(var key in o1){
            // 取出第一个对象当前属性对应的值
            var item = o1[key]; // dog
            // 判断当前的值是否是引用类型
            // 如果是引用类型, 我们就重新开辟一块存储空间
            if(item instanceof Object){
                //instanceof运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的原型链上
                var temp = new Object();
                /*
                {name: "wc",age: "3"}
                 */
               deepCopy(item, temp);   //递归
                o2[key] = temp;
            }else{
                // 基本数据类型
                o2[key] = o1[key];
            }
        }
    }

    let obj1 = {
        name:'会吃猫的鱼',
        eat: function () {
            console.log(this.name)
        }
    }
    let obj2 = deepCopy(obj1);
    obj2.name='猫和鱼';
    console.log(obj1,obj2)


  

/**
 *1. 原生js实现对象深拷贝 
 * @param {*} obj 
 */
function deepCopy(obj){
    if(obj === null) return null;
      //constructor 属性返回对创建此对象的数组函数的引用。
    if(typeof obj !== 'object') return obj; //若不是引用类型直接返回
    if(obj.constructor === Array)  {
         var result=[];
         for (let i in obj) {
                // 递归克隆数组中的每一项
                result.push(deepCopy(obj[i]))
            }
            return result
    }
    if(obj.constructor === Date) return new Date(obj);
    if(obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor(); //创建新内存地址,存放新对象(将原型中的继承复制给新建原型对象)
   //遍历对象自身和继承的可枚举属性
    for(var key in obj){
        //hasOwnProperty判断对象是否包含特定的自身（非继承）属性。
        if(obj.hasOwnProperty(key)){
            var val = obj[key];
            if(typeof val === 'object'){
                //若值为引用类型,则需再次调用函数(递归),因为引用类型中的变量被赋值后,变量都保存了同一个对象地址,当修改其中一个变量会导致另外一个变量受到影响.
                newObj[key]=deepCopy(val)
            }else{
                newObj[key]=val
            }
        }
    }
    return newObj;
}
 let obj1 = {
        name:'会吃猫的鱼',
        eat: function () {
            console.log(this.name)
        }
    }
let obj2 = deepCopy(obj1);
obj2.name='猫和鱼';
console.log(obj1,obj2)

/**
 * 2. js递归调用,处理字符串,每n个换一行,单词会折行
 * @param {String} str 字符串
 * @param {Number} n 每行固定字符串个数
 */
 function addStrLine(str,n){
   return insertString1(n,str.substr(0,n),str.substr(n,str.length),"\n");
 }

 function insertString1(n,startStr,endStr,insertStr){
     //当被截取之后剩余的长度大于某行固定值时,需递归调用
   if(endStr.length > n){
    endStr=insertString(n,endStr.substr(0,n),endStr.substr(n,endStr.length),"\n");
   }
   if(startStr!=null && endStr!=null){
         return startStr + insertStr + endStr;
   }
      return null;       
  }
var text=`Falling in love with yourself first doesn’t make you vain or selfish, it makes you indestructible.`;
var number=20
// var newText=text.replace(/\s+/g, "");//利用正则去除字符串空格和换行
console.log(addStrLine(text,number))

 /**
    * js递归调用,处理字符串,每n个换一行 ,单词不折行
    * @param {String} str 字符串
    * @param {Number} n 每行固定字符串个数
    */
  function addStrLine(str,number){
    var newArr=[];
    var targetStr,// 目标字符串
        addStr =  ' ',// 截取后添加的字符串
        sliceLength = str.length;// 截取字符串长度
    var array=str.split(' ');//将字符串根据空格截取转化为数组 
    for (let i = 0; i < array.length; i++) {
        targetStr   = array[i];  
        var count=0;;//记录某行存了几个单词
        for (let j = i+1; j < array.length; j++) {
            const nextStr = array[j];
            if( targetStr.length <  number){
                count=j 
                targetStr= insertString(targetStr,sliceLength,addStr,nextStr)
            }else{
                i=count+1
                targetStr=targetStr
            } 
        }
            newArr.push(targetStr);
    }
    return newArr.join('\n')
    }
    function  insertString(targetStr,sliceLength,addStr,nextStr) {
        targetStr= targetStr.slice(0,sliceLength) + addStr + nextStr;
        return targetStr;
    }

    var text=`Falling in love with yourself first doesn’t make you vain or selfish, it makes you indestructible.`;
    var number=20;
    console.log(addStrLine1(text,number))
