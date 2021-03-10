'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
 单据流转的业务模块，实现了采购、库存管理相关的业务逻辑
 @module docu.model
 */

/**
 * 通用的单据行为实现类，单据保存于表 t_docu,t_order,t_order_apply,t_pay,t_xxxx_rec </br>
 * 相关表：t_goods, t_supplier, t_period,t_period_stock, 参数存于 t_code
 * @class docu.model.docu
 */

const CMPage = require('../cmpage/page.js');

module.exports = class extends CMPage {


    /**
     * 根据单据类型取单号
     * @method  getDocuNo
     * @return {string}  单号：形如： PR201610120001
     */
    async getBusinessNo() {
        
        let no = 'GYLJR-' + cmpage.datetime(null, 'YYYYMMDDHHmmss')+'-';
        //debug(no,'docu.getDocuNo - no');
        //let maxNo = await this.model(this.mod.c_table).where({c_no:['like',no+'%']}).max('c_no');
        let list = await this.query(`select max(id) as maxno from t_scf_recieve_business`);
        //debug(list,'docu.getDocuNo - list');
        let maxno = list[0]['maxno'];
        //debug(maxno,'docu.getDocuNo - maxno');
        let cnt = '0001';
        if (!think.isEmpty(maxno)) {
            cnt = maxno + 1;
            cnt = cnt.toString();
        }

        return no + '0000'.substring(0, 4 - cnt.length) + cnt;
    }

    async pageDelete() {
        //删除后需要变动库存数量等
        console.log("---------------pagedelete-------------");
        console.log(this.mod.recID);
        await this.model('t_scf_order_list').where(` id=${this.mod.recID}`).delete();

        return {
            statusCode: 200,
            message: '删除成功！',
            data: {}
        };
    }

    /**
     * 根据单据类型取单号
     * @method  getDocuNo
     * @return {string}  单号：形如： PR201610120001
     */
    async getBuildNo() {
        
        let no = 'GYLJRB-' + cmpage.datetime(null, 'YYYYMMDDHHmmss')+'-';
        //debug(no,'docu.getDocuNo - no');
        //let maxNo = await this.model(this.mod.c_table).where({c_no:['like',no+'%']}).max('c_no');
        let list = await this.query(`select max(id) as maxno from t_scf_recieve_business`);
        //debug(list,'docu.getDocuNo - list');
        let maxno = list[0]['maxno'];
        //debug(maxno,'docu.getDocuNo - maxno');
        let cnt = '0001';
        if (!think.isEmpty(maxno)) {
            cnt = maxno + 1;
            cnt = cnt.toString();
        }

        return no + '0000'.substring(0, 4 - cnt.length) + cnt;
    }

    //fromID:这个是材料的ID
    //docuID:这个是项目的ID
    //
    //
    //
    //
    async goodsAddtoApp(fromID, docuID) {

        let md = await this.model('t_scf_build_business').where('id=' + docuID).find();
        if (think.isEmpty(md)) {
            return {
                statusCode: 300,
                message: `项目ID不存在!`
            };
        }

        let rec = {
            c_build_id:docuID,
            c_order_id:fromID
        };
        let recID = await this.model('t_scf_order_list').add(rec);
        // if (recID > 0) {
        //     await this.query(`update t_order_apply_rec set c_qty_to=c_qty,c_close ='1' where c_id=${fromID}`);
        // }
        return {
            statusCode: recID > 0 ? 200 : 300,
            message: recID > 0 ? "添加成功" : "操作失败！"
        };
    }

    /**
     * 修改状态，供界面按钮直接调用，工作流相关方法（状态流转，比如Appr中保存的时候调用本方法可以更新状态及其他操作）</br>
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
        let ret = {
            statusCode: 300,
            message: '参数错误!'
        };
        if (id > 0 && actID > 0 && status > 0) {
            let rec = {
                c_status: status,
                c_act: actID,
                c_user: this.mod.user.id,
                c_time: think.datetime()
            };
            await this.query(`update ${this.mod.c_table} set c_status=${status},c_act=${actID},c_appr_people=${this.mod.user.id},
                c_appr_time='${think.datetime()}',c_time='${think.datetime()}' where c_id=${id}`);
            cmpage.debug(this.docuType, 'this.docuType');
            console.log("999999999999999999");
            console.log("999999999999999999");
            console.log("999999999999999999");
            console.log("999999999999999999");
            console.log("999999999999999999");
            console.log("999999999999999999");
            console.log("999999999999999999");
            //根据状态值及单据类型，进行 更新库存等操作
            if (status == 1213 && (this.docuType.id == this.cmpage.enumDocuType.DocuCheck || this.docuType.id == this.cmpage.enumDocuType.DocuSale ||
                    this.docuType.id == this.cmpage.enumDocuType.DocuTransfer)) {
                console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
            console.log("1112121213213123123123123124123123");
                let recList = await this.model('vw_docu_list').where(`c_id=${id}`).select();
                for (const rec of recList) {
                    await this.query(`p_stock_goods_qty_calc ${rec.c_goods},${rec.c_stock},${this.mod.user.groupID}`);
                }
            }
            ret = {
                statusCode: 200,
                message: '操作执行成功！'
            }
        }
        if (ret.statusCode === 200 && isSelf) {
            //增加历史状态记录,此处关联已经明确，逻辑明确，故而直接增加状态记录
            let apprRec = {
                c_link: id,
                c_link_type: this.mod.c_table,
                c_modulename: this.mod.c_modulename,
                c_status: status,
                c_desc: '',
                c_user: this.mod.user.id,
                c_time: think.datetime(),
                c_group: this.mod.user.groupID,
                c_act: actID
            };
            await cmpage.service('cmpage/base').model('t_appr').add(apprRec);
        }
        return ret;

    }

}