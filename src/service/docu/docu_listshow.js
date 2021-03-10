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

const CMPage = require('../cmpage/page_ms.js');

module.exports = class extends CMPage {

    async initPage() {
        await super.initPage();
    }

    async getQueryWhere() {
        //通过父类的方法取查询列设置解析后的where子句
        let where = await super.getQueryWhere();
        console.log("----------------where-----------------");
        console.log(where);
        //此处增加额外的条件
        // if (this.docuType.id == cmpage.enumDocuType.Order || this.docuType.id == cmpage.enumDocuType.OrderApply) {
        //     where += ` and c_status = 1213 and (c_qty - ${this.sqlTranslate('isnull')}(c_qty_to,0) >0) and c_group in(${this.mod.user.groups})`;
        // } else if (this.docuType.id == cmpage.enumDocuType.DocuInvalid) {
        //     where += ` and c_status = -1 and c_group in(${this.mod.user.groups})`;
        // } else {
        //     where += ` and c_status = 1213 and (c_qty - ${this.sqlTranslate('isnull')}(c_qty_to,0) >0) and c_type=${this.docuType.id} and c_group in(${this.mod.user.groups})`;
        // }

        return where;
    }

    htmlGetTabs() {
        //debug(this.mod,'page_ms.htmlGetTabs - this.mod');
        if (this.mod.editID == 0 || think.isEmpty(this.mod.c_module_slave.modulename)) return '';
        let html = [];
        html.push(`    <div id="rec${this.mod.c_modulename}Div" >
            <fieldset>
            <legend>-</legend>
            <ul class="nav nav-tabs" role="tablist">`);

        // for(let tab of this.mod.c_module_slave){
        //     html.push(`<li ${ tabs.indexOf(tab) ===0 ? "class=active":""}><a href="#page${tab.modulename}" role="tab" data-toggle="tab">${tab.title}</a></li>`);
        // }
        //暂时考虑一个TAB的情况
        let tab = this.mod.c_module_slave;

        // let list = await this.query(`select * from t_order where c_id=${this.mod.editID}`);
        // console.log("---------------------");
        // console.log(list[0].c_no);
        // console.log("----------------------");
        
        
        debug(tab, 'page_ms.htmlGetTabs - tab');
        html.push(`<li class="active"><a href="#page${tab.modulename}" role="tab" data-toggle="tab">${tab.title}</a></li>`);

        html.push(`</ul> <!-- Tab panes --> <div class="tab-content">`);

        // for(let tab of this.mod.c_module_slave){
        //     html.push(`<div class="tab-pane fade ${tabs.indexOf(tab) ==0 ? "active in":""}" id="page${tab.modulename}"  name="page${tab.modulename}"
        //         data-url="/cmpage/page/list?modulename=${tab.modulename}&${tab.key}=${this.mod.editID}&moduleOpen=div${think.isEmpty(this.mod.parmsUrl.readonly) ? '':'&readonly=1'}"
        //         data-toggle="autoajaxload">  </div>`);
        // }
        html.push(`<div class="tab-pane fade active in" id="page${tab.modulename}"  name="page${tab.modulename}"
            data-url="/cmpage/page/list?modulename=${tab.modulename}&c_no=${this.mod.parmsUrl.c_no}&${tab.key}=${this.mod.editID}&moduleOpen=div${think.isEmpty(this.mod.parmsUrl.readonly) ? '':'&readonly=1'}"
            data-toggle="autoajaxload">  </div>`);

        html.push('</div>   </fieldset>   </div>');
        //debug(html,'page_ms.htmlGetTabs - html');
        return html.join(' ');
    }


}