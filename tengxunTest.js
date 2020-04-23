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
        if ((str.charCodeAt(i) & 0xff00) != 0) {
            leng++;
        }
        leng++;
    }
    return leng
}

/**
 * 4. js题目：实现一个js方法appendParams，可以给url加上多个新的参数，多考虑兼容性。
用法例如appendParams('http://url', {a:1,b:2})返回http://url?a=1&b=2。
 * @param {*} url 
 * @param {*} obj 
 */

function appendParams(url, obj) {
    let newArray = []
    for (let [key, value] of Object.entries(obj)) {
        newArray.push(key + '=' + value)
    }
    console.log(newArray.join('&'))
    return url + newArray
}

/**
 * 5. js题目：给一个时间戳，计算出这个时间戳对应当月的第一天0点0分0秒的时间戳
 * @param {*} nowTime 时间戳
 */

function getTime(ATime) {
    let nowTimeDate = new Date();
    nowTimeDate.setHours(0, 0, 0, 0);
    var realTime = nowTimeDate.getTime() + ATime;
    return realTime
}

/**
 * 6. js题目： 实现一个发布订阅模式示例： 实现一个pubSub类， 当执行pubSub.subscribe(事件名, 处理方法) 可以订阅某个事件，
  当执行pubSub.publish(事件名, 数据) 的时候可以发布某个事件。
 */

var pubsub = (function () {
    var obj = {}
    topics = {},
        subUid = -1;
    //发布事件
    obj.publish = function (topic, args) {
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
    obj.subscribe = function (topic, func) {
        topics[topic] = topics[topic] ? topics[topic] : [];
        var token = (++subUid).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    };

    return obj;
})();

var message = function (topics, data) {
    console.log(topics + ":" + data);
}

var sub1 = pubsub.subscribe(message);