/*
 * @Date: 2020-07-18 16:18:06
 * @LastEditors: fashandian
 * @LastEditTime: 2020-07-18 18:07:08
 */
const http = require('http');
const EventEmitter = require('events');
const Stream = require('stream');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Koa extends EventEmitter {
    constructor() {
        // 继承this
        super();
        this.callback = null;
        this.context = context;
        this.request = request;
        this.response = response;
    }

    // 使用中间件
    use(callback) {
        this.callback = callback;
    }

    // 创建上下文
    createContext(req, res) {
        // 创建一个新对象，它的 __proto__ 由 this.context 提供，也就是继承 this.context 的属性，
        // ctx.__proto__ = this.context
        const ctx = Object.create(this.context);
        const request = (ctx.request = Object.create(this.request));
        const response = (ctx.response = Object.create(this.response));
        // 各种赋值
        ctx.req = request.req = response.req = req;
        ctx.res = request.res = response.res = res;
        request.ctx = response.ctx = ctx;
        request.response = response;
        response.request = request;

        return ctx;
    }

    // 处理请求
    handleRequst(req, res) {
        // 设置状态码
        res.statusCode = 404;
        // 创建上下文
        const ctx = this.createContext(req, res);
        // 将上下文交还给用户使用
        this.callback(ctx);
        // 判断返回的数据的类型并做相应处理，输出信息到页面
        if (typeof ctx.body === 'object') {
            res.setHeader('Content-Type', 'application/json;charset=utf8');
            res.end(JSON.stringify(ctx.body));
        } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
            res.setHeader('Content-Type', 'text/html;charset=utf8');
            res.end(ctx.body);
        } else if (typeof ctx.body instanceof Stream) {
            ctx.body.pipe(res);
        } else {
            res.end('Not Found!');
        }
    }

    // 监听启动服务
    listen(...args) {
        // 拿到回调传进去
        const server = http.createServer(this.handleRequst.bind(this));
        // listen 方法有多个参数，所以直接解构参数传进去
        server.listen(...args);
    }
}

module.exports = Koa;
