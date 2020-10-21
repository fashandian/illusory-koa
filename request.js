/*
 * @Date: 2020-07-18 16:18:13
 * @LastEditors: fashandian
 * @LastEditTime: 2020-07-18 17:20:18
 */
const url = require('url');

module.exports = {
    get url() {
        return this.req.url;
    },
    get path() {
        return url.parse(this.url).pathname;
    },
    get query() {
        return url.parse(this.url).query;
    },
};
