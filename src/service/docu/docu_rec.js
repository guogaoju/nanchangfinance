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
    //单据类型, 参见：cmpage.enumDocuType （cmpage_global_docu.js）
    //OrderApply:1,  Order:2,  DocuArrive:3,DocuCheck:4,DocuSale:5, DocuPick:6, DocuStock:7, DocuTransfer:8, DocuBill:20
    constructor() {
        super();
        this.pk = 'c_id';
        this.docuType = {
            id: 0,
            name: '',
            header: '',
            key: 'c_docu',
            modulename: ''
        };
    }

    /**
     * 初始化设置页面参数
     * @method  initPage
     */
    async initPage() {
        await super.initPage();
        //根据模块名称，取单据基本信息
        let typeName = this.mod.c_modulename.replace(/Rec/, '');
        for (let p in cmpage.enumDocuType) {
            if (p == typeName) {
                this.docuType.id = cmpage.enumDocuType[p];
                this.docuType.name = cmpage.enumDocuType[p + '_name'];
                this.docuType.header = cmpage.enumDocuType[p + '_header'];
                this.docuType.modulename = p;
            }
        }
        if (this.docuType.id === cmpage.enumDocuType.OrderApply) this.docuType.key = 'c_order_apply';
        if (this.docuType.id === cmpage.enumDocuType.Order) this.docuType.key = 'c_order';
        //debug(this.docuType,'docu_rec.initDocuType - this.docuType');
    }
    async pageDelete() {
        //删除后需要变动库存数量等
        console.log("---------------pagedelete-------------");
        console.log(this.mod.recID);

        let goods = await this.query(`select * from t_order_rec where c_id=${this.mod.recID}`);

        let rec_from = goods[0].c_rec_from;

        await this.query(`update t_order_apply_rec set c_close=0 where c_id=${rec_from}`)

        await this.model('t_order_rec').where(` c_id=${this.mod.recID}`).delete();

        return {
            statusCode: 200,
            message: '删除成功！',
            data: {}
        };
    }

    /**
     * 增加物料明细，根据模块名称判断数据来源，实现相应的逻辑
     * @method  goodsAdd
     * @return {object} 返回前端的状态对象
     */
    // async goodsAdd(fromID, docuID) {
    //     if (think.isEmpty(docuID)) return {
    //         statusCode: 300,
    //         message: `单据ID错误!`
    //     };
    //     return {
    //         statusCode: 300,
    //         message: "请在子类中重写本方法！"
    //     };
    // }
    // 
        /**
     * 增加物料明细，根据模块名称判断数据来源，实现相应的逻辑
     * @method  goodsAdd
     * @return {object} 返回前端的状态对象
     */
    async goodsAdd(fromID, docuID) {
        if (think.isEmpty(docuID)) return {
            statusCode: 300,
            message: `单据ID错误!`
        };
        let md = await this.model('vw_order_apply_list').where('rec_id=' + fromID).find();
        if (think.isEmpty(md)) {
            return {
                statusCode: 300,
                message: `项目申购记录ID不存在!`
            };
        }

        let rec = {
            c_order: docuID,
            c_goods: md.c_goods,
            c_unit: md.c_unit,
            c_qty: md.c_qty - md.c_qty_to,
            c_price: 0,
            c_price_tax: 0,
            c_tax: 17,
            c_date_delivery: think.datetime(),
            c_qty_from: md.c_qty - md.c_qty_to,
            c_qty_to: 0,
            c_rec_from: fromID,
            c_no: md.c_no,
            c_qty_kp: 0,
            c_close: false,
            c_qty_stock: 0,
            c_is_pay: false,
            c_amt: 0,
            c_amt_tax: 0,
            c_memo: ''
        };
        let recID = await this.model('t_order_rec').add(rec);
        if (recID > 0) {
            await this.query(`update t_order_apply_rec set c_qty_to=c_qty,c_close ='1' where c_id=${fromID}`);
        }
        return {
            statusCode: recID > 0 ? 200 : 300,
            message: recID > 0 ? "" : "操作失败！"
        };
    }


    async goodsAddProj(fromID, docuID) {
        if (think.isEmpty(docuID)) return {
            statusCode: 300,
            message: `单据ID错误!`
        };
        let md = await this.model('t_goods').where('c_id=' + fromID).find();
        if (think.isEmpty(md)) {
            return {
                statusCode: 300,
                message: `项目申购记录ID不存在!`
            };
        }

        let rec = {
            c_order_apply: docuID,
            c_goods: md.c_id,
            c_qty: 0,
            c_use: '',
            c_supplier: 0,
            c_time_arrive: think.datetime(),
            c_close: 0,
            c_qty_to: 0,
            c_memo: ''
        };
        let recID = await this.model('t_order_apply_rec').add(rec);
        // if (recID > 0) {
        //     await this.query(`update t_order_apply_rec set c_qty_to=c_qty,c_close ='1' where c_id=${fromID}`);
        // }
        return {
            statusCode: recID > 0 ? 200 : 300,
            message: recID > 0 ? "" : "操作失败！"
        };
    }


    


    /**
     * 预处理保存的参数,<br/>
     * 根据各种单据类型，增加对保存项的逻辑验证
     * @method  pageSavePretreat
     * @return {object} 处理后的参数
     * @param  {object} parms 前端传入的FORM参数
     */
    pageSavePretreat(parms) {
        parms.c_qty = parseFloat(parms.c_qty) || 0;
        if (this.docuType.id != cmpage.enumDocuType.DocuStock && parms.c_qty <= 0) {
            return {
                statusCode: 300,
                message: '数量应大于 0'
            };
        }
        //类型检查
        parms.c_qty_from = parseFloat(parms.c_qty) || 0;
        parms.c_price = parseFloat(parms.c_price) || 0;
        parms.c_price_tax = parseFloat(parms.c_price_tax) || 0;
        parms.c_price_out_tax = parseFloat(parms.c_price_out_tax) || 0;
        parms.c_qty_stock = parseFloat(parms.c_qty_stock) || 0;
        parms.c_tax = parseFloat(parms.c_tax) || 17;

        return parms;
    }

    /**
     * 编辑页面保存,<br/>
     * 根据各种单据类型，增加对保存项的逻辑验证
     * @method  pageSave
     * @return {object} 如果有验证错误，则返回格式： {statusCode:300, message:'xxxxxx'}
     * @param  {object} parms 前端传入的FORM参数
     */
    async pageSave(parms) {
        parms = this.pageSavePretreat(parms);
        console.log("------------------parms------------------");
        console.log(parms);
        // var obj = {};
        // obj.c_id = parms.c_id;
        // obj.c_goods = parms.c_goods;
        // obj.c_qty = parms.c_qty;
        // obj.c_use = parms.c_use;
        // obj.c_supplier = parms.c_supplier;
        // obj.c_time_arrive = parms.c_time_arrive;
        // obj.c_memo = parms.c_memo;
        // obj.c_close = parms.c_close;
        // obj.c_qty_to = parms.c_qty_to;
        // obj.c_order_apply = parms.c_order_apply;
        var _tax = parms.c_tax/100+1;
        parms.c_amt = parms.c_amt_tax/_tax;

        return await super.pageSave(parms);
    }

}