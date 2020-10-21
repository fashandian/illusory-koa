/*
 * @Date: 2020-07-18 16:18:28
 * @LastEditors: fashandian
 * @LastEditTime: 2020-07-18 17:56:08
 */
const proto = {};

const defineGetter = (prop, name) => {
    // 将一个函数绑定在当前对象的指定属性下，当属性值被访问时，绑定的函数会被调用
    proto.__defineGetter__(name, function () {
        return this[prop][name];
    });
};

const defineSetter = (prop, name) => {
    proto.__defineSetter__(name, function (value) {
        this[prop][name] = value;
    });
};

defineGetter('request', 'url');
defineGetter('request', 'path');
defineGetter('request', 'query');
defineGetter('response', 'body');

defineSetter('response', 'body');

module.exports = proto;
