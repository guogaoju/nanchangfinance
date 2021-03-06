'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------


const Base = require('../cmpage/base.js');

module.exports = class extends Base {

    async test(cronID) {
        debug('dddddddddddddddd');
        const json = await this.fetchJson('https://api.github.com/repos/thinkjs/think-fetch');

        cmpage.warn(json);
        //await this.addCrontabLog(taskID, msg, this.cmpage.enumStatusExecute.SUCCESS);

    }

    async startrank(cronID) {
        await this.query(`call start_rank();`);
    }


    async exeByUrl(cronID){
        let cron = await this.model('t_crontab').where(`id=${cronID}`).find();
        let exeRole = this.cmpage.objFromString(cron.c_exe_role);
//        cmpage.warn(exeRole);
        if(!think.isEmpty(exeRole.url)){
            let json = await this.fetchJson(exeRole.url);
            cmpage.debug(json);
            await this.addCrontabLog(cronID, this.cmpage.objToString(json), this.cmpage.enumStatusExecute.SUCCESS);
        }
    }

    async addCrontabLog(cronID, msg, status) {
        let md = {
            c_crontab: cronID,
            c_desc: msg,
            c_time: new Date(),// this.cmpage.datetime('yyyy-MM-dd HH:mm:ss'),
            c_status: status,
            c_group: 0
        };
        await this.model('t_crontab_log').add(md);
    }



}