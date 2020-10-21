/*
 * @Date: 2020-07-18 16:18:21
 * @LastEditors: fashandian
 * @LastEditTime: 2020-07-18 17:53:56
 */
module.exports = {
    get body() {
        return this._body;
    },
    set body(value) {
        // 设置了 body 则应该将状态码设置成 200
        this.res.statusCode = 200;
        this._body = value;
    },
};
