'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------


const CMPage = require('../cmpage/page_ms.js');

module.exports = class extends CMPage {
    /**
     * 取查询项的设置，结合POST参数，得到Where字句
     */
    async getQueryWhere() {
        //通过父类的方法取查询列设置解析后的where子句
        let user = await this.mod.user;
        console.log("----------------------------");
        console.log(user);
        console.log("----------------------------");
        
        let where = await super.getQueryWhere();
        if(user.c_role == 1108)
        {
          where += ` and  c_name="${user.c_name}" and c_status<>-1`; //也可以在查询列设置一条 ‘固定’类型的查询列，备注中填： c_status<>-1
        }else{
          where += ` and c_status<>-1`; //也可以在查询列设置一条 ‘固定’类型的查询列，备注中填： c_status<>-1
        }

        
        //此处增加额外的条件
       // where += ` and  c_user=${user.id} and c_status<>-1`; //也可以在查询列设置一条 ‘固定’类型的查询列，备注中填： c_status<>-1
        debug(where);
        return where;
    }


    async pageSave(parms) {
        let model = cmpage.service('cmpage/base');
        let order = await model.query(`select * from nanchang_docu.t_order where c_id=${parms.c_id}`);
        let pro = await model.query(`select * from nanchang_docu.t_order_apply where c_no='${order[0].c_no}'`);
        parms.c_rec_id = pro[0].c_id;
        this.cmpage.warn(parms);
        return await super.pageSave(parms);
    }

    /**
     * 修改状态，供界面按钮直接调用，工作流相关方法（状态流转类）</br>
     * 子类中覆写本方法，可以根据业务对象的状态增加其他逻辑
     * @method  updateStatus
     * @return {object} 结果输出
     * @params {int} id 记录ID
     * @params {int} actID 流程节点ID
     * @params {int} status 状态值，一般在t_code表中设置
     * @params {boolean} isSelf 自身表单的调用，区别于其他模块的调用
     */
    async updateStatus(id, actID, status, isSelf) {
        //修改业务对象状态
        console.log("================updateStatus===============");
        console.log(actID);
        console.log(status);

        console.log("===============================");
        if(actID==191 && status==1560){
            let model = cmpage.service('cmpage/base');
            let businessArr = await model.query(`select * from t_scf_build_business where id=${id}`);

            if(businessArr.length<1){
                return{
                    statusCode: '300',
                    message: "业务不存在！"
                };
              }

            let rankArr = await model.query(`select * from t_scf_rank where c_uid='${businessArr[0].c_uid}' and  (to_days(now())-to_days(c_time))<120 and c_status>0 order by id desc limit 1`);

            if(rankArr.length<1){
              return {
                  statusCode: '300',
                  message: "客户未评级，或评级时间超过120天！"
              }
            }

            if(rankArr[0].c_level_score<50){
                return {
                  statusCode: '300',
                  message: "对不起，您的评级得分过低，无法在线提交申请，请联系业务人员"
              }
            }
        }
        let ret = await super.updateStatus(id, actID, status, isSelf);

        return ret;

    }

}