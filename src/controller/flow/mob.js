'use strict';

const Base = require('./base.js');

module.exports = class extends Base {

    async getUnreadMsgAction() {
        console.log("1111123123123123124123123");
        let user = await this.session('user');
        let id = this.get('id');
        let res = await cmpage.service('flow/msg').getUnReadCount(user.id);
        console.log("1111123123123123124123123");
        console.log(this.json(res));
        return this.json(res);
    }

}