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
     * 取编辑页面的按钮设置，组合按钮的HTML输出
     * @method  htmlGetEditBtns
     * @return {string} HTML页面片段
     */
    async htmlGetEditBtns() {
        //cmpage.debug(this.mod,'page.htmlGetEditBtns -- this.mod')
        let html = [];
        let parmsUrl = this.mod.parmsUrl;

        if (think.isEmpty(this.mod.c_other.editHideCloseBtn)) {
            html.push('<li><button type="button" class="btn-close" data-icon="close">关闭</button></li>');
        }
        //debug(task,'page.htmlGetEditBtns - task');
        let defaultSaveBtn = '<li ><button type="submit" class="btn-green"  data-icon="save">保存</button></li>';
        if (!think.isEmpty(this.mod.c_module_slave.modulename)) {
            //主从页面的按钮处理
            let reloadUrl = `/cmpage/page/edit_ms?modulename=${this.mod.c_modulename}&listIds=`;
            for (let p in this.mod.parmsUrl) {
                //加入URL参数
                if (!['modulename', this.pk, 'listIds', '_'].includes(p)) {
                    reloadUrl += `&${p}=${this.mod.parmsUrl[p]}`;
                }
            }
            defaultSaveBtn = `<li ><button type="button" class="btn-green" onclick="return pageSaveMs('${this.mod.c_modulename}','${reloadUrl}',
                ${this.mod.editID},'${this.pk}');"  data-icon="save">保存</button></li>`;
        }
        // console.log("---------------------------------------");
        // console.log(think.isEmpty(this.mod.c_other.editHideSaveBtn));
        // console.log("---------------------------------------");
        // console.log(this.mod.parmsUrl.readonly);
        // console.log("---------------------------------------");
        // console.log(this.rec);
        // console.log("---------------------------------------");
        // console.log(this.mod.c_modulename);
        // console.log("---------------------------------------");

        //if(think.isEmpty(this.mod.c_other.editHideSaveBtn) && !this.mod.parmsUrl.readonly && !this.rec.hasOwnProperty('c_task') ) {
        // if (think.isEmpty(this.mod.c_other.editHideSaveBtn) && !this.mod.parmsUrl.readonly &&
        //     this.rec.c_act !== null && (this.rec.c_act == 0 || this.rec.c_act === this.proc.c_act_start) || (this.mod.c_modulename.indexOf('Fw')===0)) {
        if (think.isEmpty(this.mod.c_other.editHideSaveBtn) && !this.mod.parmsUrl.readonly &&
            this.rec.c_act !== null || (this.mod.c_modulename.indexOf('Fw')===0)) {
            console.log("44444444444444444");
            //不隐藏保存按钮，不是只读页面，没有关联的工作流ID
            html.push(defaultSaveBtn);
        }

        
        debug(this.rec, 'page.htmlGetEditBtns - this.rec');

        if (this.mod.editID > 0 && think.isEmpty(this.mod.c_module_slave.modulename)) {
            let listIds = parmsUrl.listIds.split(',');
            if (listIds.length > 0) {
                let prevID = 0,
                    nextID = 0;
                let k = 0;
                for (let id of listIds) {
                    if (id == this.mod.editID) {
                        k = listIds.indexOf(id);
                        break;
                    }
                }
                if (k > 0) {
                    prevID = listIds[k - 1];
                }
                if (k < listIds.length - 1) {
                    nextID = listIds[k + 1];
                }
                html.push(`<li class="left" style="margin-left: -40px;"><button type="button" class="btn-default" ${k == 0 ? 'style="display:none"' : ''} data-icon="arrow-left"
                        onclick="return pageGotoEdit('${this.mod.c_modulename}',${prevID});">上一条</button></li>`);
                html.push(`<li class="left" ><button type="button" class="btn-default" ${nextID == 0 ? 'style="display:none"' : ''} data-icon="arrow-right"
                        onclick="return pageGotoEdit('${this.mod.c_modulename}',${nextID});">下一条</button></li>`);
            }
        }
        //cmpage.warn(this.proc,'this.proc');
        console.log("============================");
        console.log(this.proc);
        console.log(this.rec);
        console.log("============================");
        //如果和流程相关，则显示流程节点的按钮
        if (!think.isEmpty(this.proc)) {
            //debug(this.proc,'this.proc');

            let actBtns = [];
            if (this.proc.c_type === cmpage.enumProcType.STATUSCHANGE) {
                //直接取模板设置的按钮
                if (this.rec.c_act > 0) {
                    actBtns = await this.htmlGetActBtns(this.rec);
                }
            }
            // else{
            //     //取当前任务节点的模板设置的按钮
            //     if(this.rec.c_task > 0 ){
            //         actBtns = await this.htmlGetTaskActBtns(this.rec);
            //     }
            // }
            for (let btn of actBtns) {
                btn = `<li class="left" >${btn}</li>`;
            }
            if (!think.isEmpty(actBtns)) html.push(actBtns.join(''));
        }

        return html.join('');
    }

    async pageDelete() {
        //删除后需要变动库存数量等
        console.log("---------------pagedelete-------------");
        console.log(this.mod.recID);
        await this.model('t_scf_build_business').where(` id=${this.mod.recID}`).delete();

        return {
            statusCode: 200,
            message: '删除成功！',
            data: {}
        };
    }

}