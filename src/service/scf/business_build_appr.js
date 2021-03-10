'use strict';

const CMPage = require('../cmpage/page_ms.js');

//VIP申请的审核和展示类，模块名称：CustomerAppr
module.exports = class extends CMPage {


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

        if(actID==192 && status==1415){
            let model = cmpage.service('cmpage/base');
            let businessArr = await model.query(`select * from t_scf_recieve_business where id=${id}`);

            if(businessArr.length<1){
                return{
                    statusCode: '300',
                    message: "业务不存在！"
                };
              }

            let rankArr = await model.query(`select * from t_scf_rank where c_uid='${businessArr[0].c_uid}' and  (to_days(now())-to_days(c_time))<120 order by id desc limit 1`);

            if(rankArr.length<1){
              return {
                  statusCode: '300',
                  message: "客户未评级，或评级时间超过120天！"
              }
            }
        }
        if(actID==208 && status==1421){
            let model = cmpage.service('cmpage/base');
            let businessArr = await model.query(`select * from t_scf_build_business where id=${id}`);

            if(businessArr.length<1){
                return{
                    statusCode: '300',
                    message: "业务不存在！"
                };
              }
            let fileData = await model.query(`select c_path from t_scf_file where c_uid='${businessArr[0].c_uid}' and c_no='${businessArr[0].c_no}' and c_type=1572`);
              if(fileData.length<1){
                return {
                    statusCode: 300,
                    message: '财务凭证不存在，请先上传相关付款凭证附件！'
                };
              } 
        }

        if(actID==209 && status==1422){
            let model = cmpage.service('cmpage/base');
            let businessArr = await model.query(`select * from t_scf_build_business where id=${id}`);

            if(businessArr.length<1){
                return{
                    statusCode: '300',
                    message: "业务不存在！"
                };
              }
            let fileData = await model.query(`select c_path from t_scf_file where c_uid='${businessArr[0].c_uid}' and c_no='${businessArr[0].c_no}' and c_type=1573`);
              if(fileData.length<1){
                return {
                    statusCode: 300,
                    message: '回款凭证不存在，请先上传相关付款凭证附件！'
                };
              } 
        }

        let ret = await super.updateStatus(id, actID, status, isSelf);

        return ret;

    }

}