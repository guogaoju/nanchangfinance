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

    async pageSave(parms) {
        if (this.mod.editID == 0) {
            //重新生成新的单据号，避免并发保存的时候重复
            parms.c_no_order = await this.getBusinessNo();
            //console.log("-------------------pageSave----------------");
            //console.log(parms.c_no_order);
        }
        this.cmpage.warn(parms);
        return await super.pageSave(parms);
    }

    async pageDelete() {
        //删除后需要变动库存数量等
        console.log("---------------pagedelete-------------");
        console.log(this.mod.recID);
        await this.model('t_order').where(` c_id=${this.mod.recID}`).delete();

        return {
            statusCode: 200,
            message: '删除成功！',
            data: {}
        };
    }

    async getBusinessNo() {
        
        let no = 'CGDH-' + cmpage.datetime(null, 'YYYYMMDDHHmmss')+'-';
        //debug(no,'docu.getDocuNo - no');
        //let maxNo = await this.model(this.mod.c_table).where({c_no:['like',no+'%']}).max('c_no');
        let list = await this.query(`select max(c_id) as maxno from t_order`);
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