'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ] 手机APP数据接口
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
 @module cmpage.controller
 */

/**
 * 移动端，业务模块展示及常用操作的URL接口
 * @class cmpage.controller.mob
 */
const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * 业务模块展示的主界面，分页列表，POST调用： /cmpage/mob/list
     * @method  list
     * @return {json}  包含HTML片段
     */
    async listAction() {
        console.log("=============listAction==============");
        let vb = {};
        let moduleApp = cmpage.service("cmpage/module");

        let parms = {};
        parms.modulename = this.post('modulename');
        if (parms.modulename.length > 30) {
            return this.json({
                statusCode: '300',
                message: parms.modulename + " 模块名错误！"
            });
        }
        parms.pageIndex = this.post('pageIndex');
        parms.pageSize = this.post('pageSize');
        console.log("-----------post----------");
        console.log(this.post());
        console.log(think.isEmpty(this.post('parmsUrl')));
        if(think.isEmpty(this.post('parmsUrl')) || this.post('parmsUrl')=='undefined'){
            parms.parmsUrl = {};
        }else{
            parms.parmsUrl = JSON.parse(this.post('parmsUrl'))
        }
        //parms.parmsUrl = JSON.parse(this.post('parmsUrl')) || {};
        Object.assign(vb, parms);
        //debug(parms,'cmpage.ctrl.mob - parms');

        let md = await moduleApp.getModuleByName(parms.modulename);
        Object.assign(parms, md);

        parms.query = this.post();
        parms.c_page_size = parms.pageSize;
        //console.log(page);
        parms.user = await this.session('user');
        //    console.log(page);
        if (think.isEmpty(parms.id)) {
            return this.json({
                statusCode: '300',
                message: parms.modulename + " 模块不存在！"
            });
        }

        //let pageModel = cmpage.service(think.isEmpty(parms.c_path) ? 'cmpage/page' : parms.c_path);
        let pageModel = cmpage.service(parms.c_path);
        if (think.isEmpty(pageModel)) {
            return this.json({
                statusCode: '300',
                message: parms.modulename + " 的实现类不存在！"
            });
        }
        
        debug(parms.query, 'cmpage.C.mob - parms.query');
        pageModel.mod = parms;
        await pageModel.initPage();
        pageModel.modQuerys = await moduleApp.getModuleQuery(parms.id);
        pageModel.modCols = await moduleApp.getModuleCol(parms.id);
        pageModel.modBtns = await moduleApp.getModuleBtn(parms.id);

        if (pageModel.mod.c_proc>0) {
            pageModel.proc = await cmpage.service('flow/proc').getProcById(pageModel.mod.c_proc);
            pageModel.proc.linkModulename = pageModel.mod.c_modulename;
            console.log("============================");
            console.log(pageModel.proc);
            console.log(pageModel.mod.c_modulename);
            console.log("============================");
        }

        // console.log("---------------pageModel proc--------------");
        // console.log(pageModel.mod);
        // console.log("-----------------------------");

        //拆分联动的下拉选择
        for (const modQ of pageModel.modQuerys) {
            if (pageModel.mod.query[modQ.c_column] && (modQ.c_type === 'areaSelect' || modQ.c_type === 'codeSelect') && !think.isEmpty(modQ.c_memo)) {
                //cmpage.warn(modQ,'cmpage.C.mob.list - modQ');
                let values = parms.query[modQ.c_column].split(',');
                if (values.length === 2) {
                    pageModel.mod.query[modQ.c_memo] = values[0];
                    pageModel.mod.query[modQ.c_column] = values[1];
                } else if (values.length === 3) {
                    let keys = modQ.c_memo.split(',');
                    pageModel.mod.query[keys[0]] = values[0];
                    pageModel.mod.query[keys[1]] = values[1];
                    pageModel.mod.query[modQ.c_column] = values[2];
                }
            }
        }
        //cmpage.warn(pageModel.mod.query,'cmpage.C.mob.list - parms');

        vb.queryHtml = await pageModel.mobHtmlGetQuery();
        let btnsHtml = await pageModel.mobHtmlGetHeaderBtns();
        // console.log("---------------pageModel proc--------------");
        // console.log(pageModel.c_proc);
        // console.log("-----------------------------");
        vb.headerBtnsHtml = btnsHtml[0];
        vb.popBtnsHtml = btnsHtml[1];
        vb.listHtml = await pageModel.mobHtmlGetList();
        // console.log("----------listHtml--------------");
        // console.log(vb.listHtml);
        // console.log("------------listHtml------------");
        vb.listIds = pageModel.list.ids.join(',');
        vb.count = pageModel.list.count;
        //cmpage.debug(vb.listHtml);
        vb.statusCode = 200;

        return this.json(vb);
    }


    /**
     * 业务模块的编辑页面，调用： /cmpage/mob/edit
     * @method  edit
     * @return {json}  包含HTML片段
     */
    async editAction() {
        let module = cmpage.service('cmpage/module');
        let parms = await module.getModuleByName(this.post('modulename'));
        parms.parmsUrl = JSON.stringify(this.post('parmsUrl'));
        parms.editID = this.post("editID");
        //console.log(page);
        parms.user = await this.session('user');
        let pageModel = cmpage.service(parms.c_path);
        if (think.isEmpty(pageModel)) {
            return this.json({
                statusCode: '300',
                message: parms.modulename + " 的实现类不存在！"
            });
        }
        //cmpage.debug(parms);
        pageModel.mod = parms;
        pageModel.mod.editID =  parms.editID;
        pageModel.modEdits = await module.getModuleEdit(parms.id);

        let editHtml = await pageModel.mobHtmlGetEdit();
        // console.log("----------------------");
        // console.log(editHtml);
        // console.log("----------------------");

        return this.json({
            statusCode: 200,
            editHtml: editHtml
        });
    }

    /**
     * 保存业务模块记录信息， POST调用： /cmpage/mob/save
     * @method  save
     * @return {json}
     */
    async saveAction() {
        let parms = this.post();
        let user = await this.session('user');
        console.log("-------------------------");
        console.log(JSON.stringify(parms));
        console.log("-------------------------");

        parms.c_user = user.id;
        parms.c_group = (think.isEmpty(parms.c_group) ? user.groupID : parms.c_group);
        parms.c_time = think.datetime();
        parms.c_status = (think.isEmpty(parms.c_status) ? 0 : parms.c_status);
        if (!think.isEmpty(parms.c_country)) { //地区联动，拆分
            let area = parms.c_country.split(',');
            parms.c_province = area[0];
            parms.c_city = area[1];
            parms.c_country = area[2];
        }
        let ret = {
            statusCode: 200,
            message: '保存成功!',
            tabid: `page${parms.modulename}`,
            data: {}
        };

        let module = cmpage.service('cmpage/module');
        let md = await module.getModuleByName(parms.modulename);
        let pageModel = cmpage.service(think.isEmpty(md.c_path) ? 'cmpage/page' : md.c_path);
        pageModel.mod = md;
        pageModel.mod.user = user;
        pageModel.modEdits = await module.getModuleEdit(md.id);
        console.log("-----------------here1---------------");
        await pageModel.pageSave(parms);
        ret.data = pageModel.rec;

        return this.json(ret);
    }

    /**
     * 业务模块的查看页面，一般调用： /cmpage/mob/view
     * @method  view
     * @return {promise}  HTML片段
     */
    async viewAction() {
        let module = cmpage.service('cmpage/module');
        let md = await module.getModuleByName(this.post('modulename'));
        let pageModel = cmpage.service(think.isEmpty(md.c_path) ? 'cmpage/page' : md.c_path);
        pageModel.mod = md;
        await pageModel.initPage();
        pageModel.mod.editID = parseInt(this.post('curID'));
        console.log("-----------------viewAction------------------");
        console.log(pageModel.mod.editID);
        pageModel.mod.user = await this.session('user');
        pageModel.modEdits = await module.getModuleEdit(md.id);

        pageModel.modCols = await module.getModuleCol(md.id);

        let viewHtml = await pageModel.mobHtmlGetView();

        return this.json({
            statusCode: 200,
            viewHtml: viewHtml
        });
    }

    //     /**
    //      * 上传文件的URL接口，调用： /cmpage/mob/upload_file </br>
    //      * 通用的附件上传，保持与表 t_file </br>
    //      * 如果仅仅是单个文件上传，然后取得保存后的文件路径名，则调用 /cmpage/page/upload_file
    //      * @method  updateFile
    //      * @return {json}  状态
    //      */
    //     async uploadFileAction(){
    //         var path = require('path');
    //         var fs = require('fs');
    //         let parms = this.post();
    //         //debug(parms,'page.C.updateFile - parms');
    //         let uploadPath = `${think.ROOT_PATH}${think.sep}www${think.sep}static${think.sep}upfiles${think.sep}${parms.link_type}${think.sep}${cmpage.datetime().substring(0,4)}`; //${parms.name}`;
    //         think.mkdir(uploadPath);
    //         let file = think.extend({}, this.file());
    //         //debug(file,'page.C.updateFile - file');
    //         if(think.isEmpty(file)){
    //             return this.json({statusCode:300, message:'您上传了无效的文件！', filename:''});
    //         }
    //
    // //        debug(uploadPath,'page.C.updateFile - path');
    //         let newPath =  uploadPath + think.sep + file.file.originalFilename;
    //         fs.renameSync(file.file.path, newPath);
    //
    //         let filename = `/static/upfiles/${parms.link_type}/${cmpage.datetime().substring(0,4)}/${file.file.originalFilename}`;
    //         return this.json({statusCode:200, message:'', filename: filename});
    //     }

}