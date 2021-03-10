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
    async createAction() {
        var c_uid = this.get('c_uid');
        var c_no = this.get('c_no');
        var c_user = this.get('c_user');

        let model = cmpage.service('cmpage/base');

        let fileData = await model.query(`select c_path from t_scf_file where c_uid='${c_uid}' and c_no='${c_no}' and c_type=1358`);
          if(fileData.length<1){
            return this.json({
                statusCode: '300',
                message: "合同附件不存在，请先上传相关附件！"
            });
          }

        let ret = await model.query(`insert into t_scf_recieve_contract(c_uid,c_no,c_act,c_status,c_user) values ('${c_uid}','${c_no}',159,1566,${c_user})`);

        await model.query(`update t_scf_recieve_business set c_status=1420 where c_uid='${c_uid}' and c_no='${c_no}'`);

        return this.json({
              statusCode: '200',
              message: "已提交合同审核流程！"
          });
    }

    async createbuildAction() {
        var c_uid = this.get('c_uid');
        var c_no = this.get('c_no');
        var c_user = this.get('c_user');

        let model = cmpage.service('cmpage/base');

        let fileData = await model.query(`select c_path from t_scf_file where c_uid='${c_uid}' and c_no='${c_no}' and c_type=1358`);
          if(fileData.length<1){
            return this.json({
                statusCode: '300',
                message: "合同附件不存在，请先上传相关附件！"
            });
          }

        let ret = await model.query(`insert into t_scf_build_contract(c_uid,c_no,c_act,c_status,c_user) values ('${c_uid}','${c_no}',212,1566,${c_user})`);

        await model.query(`update t_scf_build_business set c_status=1420 where c_uid='${c_uid}' and c_no='${c_no}'`);

        return this.json({
              statusCode: '200',
              message: "已提交合同审核流程！"
          });
    }

}