/*
 * @Date: 2020-07-18 16:06:17
 * @LastEditors: fashandian
 * @LastEditTime: 2020-07-18 18:07:46
 */
const Koa = require('./application');
const koa = new Koa();

koa.use((ctx) => {
    ctx.body = { say: 'hello world!' };
    console.log(ctx.req.url);
    console.log(ctx.request.req.url);
    console.log(ctx.response.req.url);
    console.log(ctx.request.url);
    console.log(ctx.request.path);
    console.log(ctx.url);
    console.log(ctx.path);
    console.log(ctx.query);
    console.log(ctx.body);
});

koa.listen(5000);
