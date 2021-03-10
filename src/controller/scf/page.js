'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
 @module cmpage.controller
 */

/**
 * 业务模块展示及常用操作的URL接口
 * @class cmpage.controller.page
 */
const Base = require('./base.js');

module.exports = class extends Base {

    /**
     * 业务模块的查看页面，一般调用： /cmpage/page/view?modulename=xxx
     * @method  view
     * @return {promise}  HTML片段
     */
    async view_biAction() {
        let module = cmpage.service('cmpage/module');

        let md = await module.getModuleByName(this.get('modulename'));
        let pageModel = cmpage.service(think.isEmpty(md.c_path) ? 'cmpage/page' : md.c_path);
        pageModel.mod = md;
        await pageModel.initPage();
        pageModel.mod.listIds = think.isEmpty(this.get('listIds')) ? '' : this.get('listIds');
        pageModel.mod.editID = parseInt(think.isEmpty(this.get('id')) ? this.get('c_id') : this.get('id'));
        pageModel.mod.user = await this.session('user');
        pageModel.modCols = await module.getModuleCol(md.id);

        // let viewHtml = await pageModel.htmlGetView()
        let btnHtml = await pageModel.htmlGetViewBtn()


        let model = cmpage.service('cmpage/base');

        var sSql = `select * from t_scf_rank where id=${this.get('id')}`;
        let rankData = await model.query(sSql);

        rankData[0].c_yinglinengli = ((parseFloat(rankData[0].i_JZCHSHYL_score)+parseFloat(rankData[0].i_ZZCHBCHL_score)+parseFloat(rankData[0].i_XSHLRL_score)+parseFloat(rankData[0].i_CBFYLRL_score)+parseFloat(rankData[0].i_ZBSYL_score))/5).toFixed(2);
        rankData[0].c_zichanzhiliang = ((parseFloat(rankData[0].i_ZZCHZHZHL_score)+parseFloat(rankData[0].i_YSHZHKZHZHL_score)+parseFloat(rankData[0].i_LDZCHZHZHL_score))/3).toFixed(2);
        rankData[0].c_zhaiwufengxian = ((parseFloat(rankData[0].i_ZCHFZHL_score)+parseFloat(rankData[0].i_SDBL_score)+parseFloat(rankData[0].i_DXFZHBL_score))/3).toFixed(2);
        rankData[0].c_jingyingzengzhang = ((parseFloat(rankData[0].i_XSHZZHL_score)+parseFloat(rankData[0].i_ZBBZHZZHL_score)+parseFloat(rankData[0].i_XSHLRZZHL_score)+parseFloat(rankData[0].i_ZZCHZZHL_score))/4).toFixed(2);


        console.log(rankData[0]);
        this.assign("rank", rankData[0]);
        var dingxingArr = [];
        let dingxingData = await model.query(`select c_name from t_code where c_pid in (1438,1443)`);
        for (const md of dingxingData) {
            console.log(md);
            dingxingArr.push(md.c_name);
        }

        var dingliangArr = [];
        let dingliangData = await model.query(`select c_name from t_code where c_pid in (1439,1440,1441,1442)`);
        for (const md of dingliangData) {
            console.log(md);
            dingliangArr.push(md.c_name);
        }
        console.log("-----------------------------");
        console.log(dingxingArr);
        console.log("-----------------------------");
        console.log(dingliangArr);
        console.log("-----------------------------");
        console.log(rankData[0]);
        console.log("-----------------------------");
        this.assign('dingxingArr',dingxingArr);
        this.assign('dingliangArr',dingliangArr);
        this.assign('mod', pageModel.mod);
        // this.assign('viewHtml', viewHtml);
        this.assign('btnHtml', btnHtml);
        return this.display();
    }

    async view_scoreAction() {

        let model = cmpage.service('cmpage/base');

        var sSql = `select * from t_scf_rank where c_uid=${this.get('id')} order by id desc limit 1`;
        let rankData = await model.query(sSql);

        console.log("-------------------------");
        console.log(rankData);
        console.log("-------------------------");

        this.assign('data', rankData[0]);
        return this.display();
    } 

    async view_scoredetailAction() {

        let model = cmpage.service('cmpage/base');

        var sSql = `select * from t_scf_rank where id=${this.get('id')} order by id desc limit 1`;
        let rankData = await model.query(sSql);

        console.log("-------------------------");
        console.log(rankData);
        console.log("-------------------------");

        this.assign('data', rankData[0]);
        return this.display();
    } 

    async view_dingxingAction() {

        let model = cmpage.service('cmpage/base');

        var sSql = `select * from t_scf_dingxingbiao where c_uid=${this.get('id')} order by id desc limit 1`;
        let rankData = await model.query(sSql);
        rankData[0].c_value1 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value1);
        rankData[0].c_value2 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value2);
        rankData[0].c_value3 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value3);
        rankData[0].c_value4 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value4);
        rankData[0].c_value5 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value5);
        rankData[0].c_value6 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value6);
        rankData[0].c_value7 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value7);
        rankData[0].c_value8 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value8);
        rankData[0].c_value9 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value9);
        rankData[0].c_value10 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value10);
        rankData[0].c_value11 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value11);
        rankData[0].c_value12 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value12);
        rankData[0].c_value13 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value13);
        rankData[0].c_value14 = await cmpage.service('admin/code').getCodeDescById(rankData[0].c_value14);

        console.log("-------------------------");
        console.log(rankData);
        console.log("-------------------------");

        this.assign('data', rankData[0]);
        return this.display();
    } 
}