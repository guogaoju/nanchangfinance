'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
 * page_mob model 实现手机APP的模块接口
 */
/**
 @module cmpage.service
 */

/**
 * 实现了手机APP的模块接口，可继承本类对手机APP的业务模块做定制化的HTML输出和功能操作, 方法名加了mob做前导，以示区分
 * @class cmpage.service.page_mob
 */
const CMPage = require('./page.js');

module.exports = class extends CMPage {

    /**
     * 取模块列表中的MUI设置，组合成HTML输出，一般在子类中通过重写这个方法来达到页面定制的效果
     * @method  mobHtmlGetList
     * @return  {string}  HTML片段
     */
    async mobHtmlGetList() {
        let html = [];
        this.mobGetPageMuiSetting();
        //debug(this.mui.row, 'page_mob.mobHtmlGetList - this.mui.row');
        await this.getDataList();
        for (let row of this.list.data) {
            // console.log("------------------row----------------");
            // console.log(row);
            // console.log("------------------row----------------");
            //处理替换值
            for (let col of this.modCols) {
                if (col.c_type === "replace" && !(/^select/.test(col.c_memo))) {
                    row[col.c_column] = await this.getReplaceText(row[col.c_column], col.c_memo);
                } else if (col.c_coltype === 'timestamp') {
                    row[col.c_column] = cmpage.datetime(row[col.c_column], col.c_format);
                }
            }

            html.push('<li class="mui-table-view-cell mui-media mui-collapse">');
            //组合生成列表每项的内容
            html.push(`<a id="pageRow${row["c_uid"]}" class="mui-navigate-right" href="" >`);
            html.push(await this.mobHtmlGetListRow(row));
            html.push('</a>');
            // if(this.list.data.indexOf(row) ==1){
            //     debug(await this.mobHtmlGetListRow(row), 'page_mob.rowHtml');
            // }

            //加入按钮组
            html.push(`<ul class="mui-table-view mui-table-view-chevron"><li class="mui-table-view-cell" style="margin-left:-20px;margin-right:-50px;"><div>`);
            html.push(await this.mobHtmlGetListBtns(row));
            // if(this.list.data.indexOf(row) ==1){
            //     debug(await this.mobHtmlGetListBtns(row), 'page_mob.rowBtns');
            // }

            html.push('</div></li></ul>   </li>');
        }

        return html.join(' ');
    }

    /**
     * 生成列表每一行的按钮组HTML输出，一般在子类中通过重写这个方法来达到定制输出按钮的效果
     * @method  mobHtmlGetListBtns
     * @return  {string}  HTML片段
     * @param   {object} row 记录对象
     */
    async mobHtmlGetListBtns(row) {
        // console.log("------------mobHtmlGetListBtns---------------");
        // console.log("------------mobHtmlGetListBtns---------------");

        // console.log("------------mobHtmlGetListBtns---------------");
        console.log("------------mobHtmlGetListBtns---------------");
        console.log(row['id']);
        console.log(row['c_id']);
        console.log(row);
        console.log("--------------mobHtmlGetListBtns-------------");
        var _id = 0;
        if(row['id']=='undefined'){
            _id = row['c_id'];
        }else{
            _id = row['id'];
        }
        console.log("-----------------------------------");
        console.log("-----------------------------------")
        console.log("-----------------------------------")
        console.log(_id);
        console.log("-----------------------------------")
        console.log("-----------------------------------")
        console.log("-----------------------------------")
        let html = [];
        html.push('<div class="mui-slider-right mui-disabled">');
        html.push('<style> .list-btn {	padding-left: 15px !important;	padding-right: 15px !important;	}	</style>');
        for (let btn of this.modBtns) {
            if (btn.c_location > 10 && btn.c_isshow) {
                console.log("--------------pre c_url-------------");
                console.log(btn.c_url);
                console.log("--------------pre c_url-------------");
                var new_url = "";
                new_url = cmpage.objPropertysReplaceToStr(btn.c_url, row);
                console.log(new_url);
                console.log("--------------end c_url-------------");
                
                if (btn.c_object.indexOf(".View") > 0) {
                    html.push(`<a class='mui-btn mui-icon mui-icon-info cmpage-btn-view' style='margin-left:0px;margin-bottom:5px;' href='#' data-type='view' data-id='${_id}' >查看</a>`);
                } else if (btn.c_object.indexOf(".Edit") > 0 && row.c_act==0) {
                    html.push(`<a class='mui-btn  mui-icon mui-icon-compose mui-btn-green list-btn cmpage-btn-view' href='#'
                            data-type='edit' data-parmsUrl='${JSON.stringify(this.mod.parmsUrl)}'  data-id='${_id}' >编辑</a>`);
                } else if (btn.c_object.indexOf(".FileList") > 0) {
                    html.push(`<a class='mui-btn mui-icon mui-icon-image mui-btn-yellow list-btn cmpage-btn-view' href='#' data-type='list_file' data-modulename='SCFFileList'  data-parmsUrl='${JSON.stringify(cmpage.parmsFromUrl(this.getReplaceToSpecialChar(new_url)))}' >附件</a>`);
                }else if (btn.c_type === 'doajax') {
                    html.push(`<a class='mui-btn mui-btn-blue cmpage-btn-action' style='margin-left:5px;margin-bottom:5px;' href='${new_url}' alt='${btn.c_label.trim()}'>${btn.c_label}</a>`);
                } 
                // else if (btn.c_object.indexOf(".Del") > 0) {
                //     html.push(`<a class='mui-btn mui-icon mui-icon-trash mui-btn-red list-btn cmpage-btn-action' 
                //         href='/cmpage/page/delete?modulename=${this.mod.c_modulename}&table=${this.mod.c_table}&id=${row['id']}&flag=false' >删除</a>`);
                // } 
            }
        }

        //cmpage.warn(this.proc,'this.proc');

        //如果和流程相关，则显示流程节点的按钮
        if (this.mod.c_proc>0) {
            //debug(this.proc,'this.proc');

            let actBtns = [];
            // console.log("============================");
            // console.log(this.mod.c_proc);
            // console.log(this.proc);
            // console.log(row.c_act);
            // console.log("============================");
            if (this.proc.c_type === cmpage.enumProcType.STATUSCHANGE) {
                //直接取模板设置的按钮
                if (row.c_act > 0) {
                    actBtns = await this.mobhtmlGetActBtns(row);
                }
            }
            // else{
            //     //取当前任务节点的模板设置的按钮
            //     if(this.rec.c_task > 0 ){
            //         actBtns = await this.htmlGetTaskActBtns(this.rec);
            //     }
            // }
            for (let btn of actBtns) {
                btn = `<li class="right" >${btn}</li>`;
            }
            // console.log("---------------actBtns---------------");
            // console.log(actBtns);
            // console.log("-------------------------------------");
            if (!think.isEmpty(actBtns)){
                html.push(`<br>`);
                html.push(actBtns.join(''));
            }
        }

        html.push('</div>');
        return html.join(' ');
    }

    /**
     * 取状态流转类型的流程节点相关的按钮设置，组合成按钮的HTML输出</br>
     * 考虑到按钮输出和业务关联度大，定义在此处
     * @method  htmlGetActBtns
     * @return {Array} 按钮数组
     */
    async mobhtmlGetActBtns(rec) {
        let html = [];

        //debug(rec,'page.htmlGetActBtns - rec');
        let actModel = cmpage.service('flow/act');
        let act = await actModel.getActById(rec.c_act);
        console.log("-------------rec-------------------");
        console.log(rec);
        console.log("-------------rec-------------------");
        // console.log("--------------act------------------");
        // console.log(act);
        console.log("----------------proc----------------");
        console.log(this.proc);
        console.log(this.mod.parmsUrl);
        console.log("------------------proc--------------");
        if (think.isEmpty(act)) {
            return [];
        }
        //debug(act,'page.htmlGetActBtns - act');

        let form = think.isEmpty(act.c_form) ? {} : cmpage.objFromString(act.c_form);
        //debug(form,'page.htmlGetActBtns - form');

        let createUserID = think.isEmpty(rec.c_creater) ? (rec.c_user || 0) : rec.c_creater;
        let prevUserID = think.isEmpty(rec.c_appr_people) ? (rec.c_user || 0) : rec.c_appr_people;
        //debug(prevUserID,'page.htmlGetActBtns - prevUserID');
        //如果主业务模块实现类已经定义了 getStatusById方法，则调用，否则，直接从数据库中取业务记录状态
        //如果主业务模块操作的数据表位于和框架不同的数据库，则需要定义 getStatusById 方法
        //debug(this.proc,'page.htmlGetActBtns - this.proc');
        let linkRec = {};
        linkRec.id = think.isEmpty(this.mod.parmsUrl.linkID) ? rec[this.pk] : this.mod.parmsUrl.linkID;
        let linkModel = cmpage.service(this.proc.c_link_model);
        linkModel.mod = await cmpage.service('cmpage/module').getModuleByName(this.proc.linkModulename);
        await linkModel.initPage();
        // console.log("--------------linkmodel-----------------");
        // console.log(linkModel);
        // console.log("----------------------------------------");
        if (think.isEmpty(linkModel['getStatusById'])) {
            linkRec = await linkModel.model(this.proc.c_link_type).where(`${linkModel.pk}=${linkRec.id}`).find();
            console.log(linkRec);
        } else {
            linkRec = await linkModel.getStatusById(linkRec.id);
        }
        linkRec.id = think.isEmpty(this.mod.parmsUrl.linkID) ? rec[this.pk] : this.mod.parmsUrl.linkID;
        // debug(linkRec, 'linkRec');
        // debug(this.proc,'this.proc');
        // debug(this.mod.c_proc,'this.mod');
        // cmpage.warn(act, 'act');
        // console.log("--------------------------------");
        // console.log(linkRec.c_status);
        // console.log(act.c_domain_st);
        // console.log("--------------------------------");
        // console.log(this.proc.c_link_type);
        // console.log(this.mod.c_table);
        // console.log("--------------------------------");
        if (act.id > 0) {
            console.log("1111111111122222222222");
            //debug(form,'page.htmlGetActBtns - form');
            //if(form.hasOwnProperty('modulename') && form['modulename'] == this.mod.c_modulename ){
            //还没有进入流程中
            if (linkRec.c_status != act.c_domain_st) {
                //debug(linkRec,'page.htmlGetActBtns - linkRec');
                //验证当前用户是否有该节点的权限
                console.log("2222222222223333333333333");

            } else if (this.proc.c_link_type == this.mod.c_table) {
                console.log("44444444444444445555555555555");
                //本表单是流程的关联主表单，则显示本流程节点的调用按钮
                //找到当前节点去向节点，并显示调用该节点的按钮，可能有多个去向
                let toActs = await cmpage.service('flow/act').getToActsFromId(this.proc.id, act.id);
                debug(toActs, 'page.htmlGetActBtns - toActs');
                for (let toAct of toActs) {
                    //验证当前用户是否有该节点的权限.
                    let actAssign = await cmpage.service('flow/act_assign').getAssignByUser(toAct.id, this.mod.user, createUserID, prevUserID);
                    //debug(actAssign,'page.htmlGetActBtns - actAssign');
                    if (think.isEmpty(actAssign)) continue;

                    let btn = think.isEmpty(toAct.c_call_btn) ? {} : eval(`(${toAct.c_call_btn})`);
                    btn.label = think.isEmpty(btn['label']) ? toAct.c_name : btn.label;
                    btn.class = think.isEmpty(btn['class']) ? 'btn-green' : btn.class;
                    btn.icon = think.isEmpty(btn['icon']) ? 'cogs' : btn.icon;
                    let form = think.isEmpty(toAct.c_form) ? {} : eval("(" + toAct.c_form + ")");
                    form.title = think.isEmpty(btn['title']) ? btn.label : btn.title;
                    form.opentype = think.isEmpty(btn['opentype']) ? 'dialog' : btn.opentype;
                    form.status = await cmpage.service('admin/code').getNameById(toAct.c_domain_st);
                    
                    
                    if (think.isEmpty(toAct.c_form)) {
                        //默认是业务主模块，则修改本身状态
                        console.log("777777777777777777777777");
                        html.push(` <a class='mui-btn  mui-icon mui-icon-compose mui-btn-green list-btn cmpage-btn-view' data-type="appr" href='#' data-parmsUrl="{url:'/cmpage/page/update_status?modulename=${this.mod.c_modulename}&id=${rec[this.pk]}&actID=${toAct.id}&status=${toAct.c_domain_st}',status:'${form.status}',modulename:'${this.mod.c_modulename}',id:'${linkRec.id}',c_status:'${toAct.c_domain_st}',c_path:'${this.proc.c_link_model}',c_link:'${rec[this.pk]}',c_act:'${toAct.id}',c_modulename:'${this.mod.c_modulename}',c_link_type:'${this.mod.c_table}'}">${btn.label}</a>`);
                    } else {
                        if (!think.isEmpty(form['modulename'])) {
                            //如果被调用节点对应 form.modulename 也是业务主模块，则修改本身状态
                            if (form.modulename === this.mod.c_modulename) {
                                console.log("8888888888888888888888888");
                                html.push(` <a class='mui-btn  mui-icon mui-icon-compose mui-btn-green list-btn cmpage-btn-view' data-type="appr" href='#' data-parmsUrl="{url:'/cmpage/page/update_status?modulename=${this.mod.c_modulename}&id=${rec[this.pk]}&actID=${toAct.id}&status=${toAct.c_domain_st}',status:'${form.status}',modulename:'${this.mod.c_modulename}',id:'${linkRec.id}',c_status:'${toAct.c_domain_st}',c_path:'${this.proc.c_link_model}',c_link:'${rec[this.pk]}',c_act:'${toAct.id}',c_modulename:'${this.mod.c_modulename}',c_link_type:'${this.mod.c_table}'}">${btn.label}</a>`);
                                continue;
                            } else {
                                form.url = `/cmpage/page/edit?modulename=${form['modulename']}&id=0&procID=${toAct.c_proc}&actID=${toAct.id}&status=${toAct.c_domain_st}&linkID=${rec[this.pk]}&linkType=${this.mod.c_table}&linkModulename=${this.mod.c_modulename}`;
                            }
                        }
                        form.url = form.url.replace(/#actID#/g, toAct.id);
                        console.log("99999999999999999999999999");
                        console.log(form.url);
                        console.log("99999999999999999999999999");

                        html.push(` <a class='mui-btn  mui-icon mui-icon-compose mui-btn-green list-btn cmpage-btn-view' data-type="appr" href='#' data-parmsUrl="{url:'${form.url}',status:'${form.status}',modulename:'${this.mod.c_modulename}',id:'${linkRec.id}',c_status:'${toAct.c_domain_st}',c_path:'${this.proc.c_link_model}',c_link:'${rec[this.pk]}',c_act:'${toAct.id}',c_modulename:'${this.mod.c_modulename}',c_link_type:'${this.mod.c_table}'}">${btn.label}</a>`);
                    }
                }
            }
        }

        return html;
    }

    /**
     * 生成列表头部按钮组HTML输出，一般在子类中通过重写这个方法来达到定制输出按钮的效果
     * @method  mobHtmlGetHeaderBtnsFromModule
     * @return  {string}  HTML片段
     */
    async mobHtmlGetHeaderBtnsFromModule() {
        let html = [];
        for (let btn of this.modBtns) {
            if (btn.c_location <= 10 && btn.c_isshow) {
                if (btn.c_object.indexOf(".Add") > 0) {
                    html.push(`<a class='mui-icon mui-icon-plus list-btn cmpage-btn-view' href='#'
                             data-type='edit' data-modulename='${this.mod.c_modulename}' data-parmsUrl='${JSON.stringify(this.mod.parmsUrl)}'  data-id='0' ></a>`);
                }
            }
        }
        return html;
    }
    async mobHtmlGetHeaderBtns() {
        let headerHtml = `<a href="cmpage-search.html" class="mui-icon mui-icon-search mui-pull-right cmpage-btn-search"></a>
        <h1 id="title" class="mui-title">${this.mod.c_alias}</h1>`;
        let html = await this.mobHtmlGetHeaderBtnsFromModule();
        if (html.length > 1) {
            //增加调用弹出菜单的按钮
            return [`${headerHtml} <a id="menu" class="mui-action-menu mui-icon mui-icon-bars mui-pull-left"></a></div>`, html.join(' ')];
        } else if (html.length == 1) {
            //直接显示按钮
            return [`${headerHtml} ${html[0]}</div>`, ' '];
        } else {
            //增加回退按钮
            return [`${headerHtml} <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a></div>`, ' '];
        }
    }

    /**
     * 取模块的MUI设置，一般在子类中通过重写这个方法来增加MUI的配置信息，需要手机端做相应的逻辑实现
     * @method  mobGetPageMuiSetting
     */
    mobGetPageMuiSetting() {
        console.log("----------mui------------");
        console.log(this.mod.c_mui);
        this.mui = cmpage.objFromString(this.mod.c_mui);
        // mui.editurl = think.isEmpty(mui.editurl) ? '/html/cmpage/cmpage-edit.html' : mui.editurl;
        // mui.viewurl = think.isEmpty(mui.viewurl) ? '/html/cmpage/cmpage-view.html' : mui.viewurl;
    }

    /**
     * 生成列表每一行的内容HTML输出，一般在子类中通过重写这个方法来达到定制分页列表的显示效果，例如： demo/customer:mobHtmlGetListRow
     * @method  mobHtmlGetListRow
     * @return  {string}  HTML片段
     * @param   {object} row 记录对象
     */
    async mobHtmlGetListRow(row) {
        let html = [];
        if (think.isEmpty(this.mui) || think.isEmpty(this.mui.row)) {
            for (let col of this.modCols) {
                if (!think.isEmpty(col.c_mui)) {
                    let its = col.c_mui.split(',');
                    html.push(`<${its[0]}> ${ its[1].replace(/#value#/, row[col.c_column]).replace(/#title#/, col.c_name.trim())} </${its[0]}>`);
                }
            }
        } else {
            html.push(cmpage.objPropertysReplaceToStr(this.mui.row, row));
        }
        return html.join(' ');
    }
    /**
     * 根据c_memo设置值，取得地区联动的HTML片段   //TODO: 需要前段MUI配合调整
     * @method  mobHtmlGetListRow
     * @return  {string}  地区联动的HTML片段
     * @param   {string} sets c_memo的设置，例如：三级：c_province,c_city 二级：c_city, 其中字段名称可以任意
     * @param   {string} colName    当前列名
     * @param   {object} query    当前记录或查询对象，一般为 this.rec 和 this.mod.query
     */
    async mobGetAreaSelect(sets, colName, query) {
        let ret = '';
        if (sets.indexOf(',') > 0) { //三级联动
            let cols = sets.split(',');
            let provinceValue = query[cols[0]] || '-1';
            let cityValue = query[cols[1]] || '-1';
            let countryValue = query[colName] || '-1';
            let areaModel = cmpage.service('admin/area');
            let provinceName = await areaModel.getProvinceName(provinceValue);
            let cityName = await areaModel.getCityName(cityValue);
            let countryName = await areaModel.getCountryName(countryValue);
            ret = `<button class='mui-btn mui-btn-block cmpage-picker-country' style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'
                        data-ref='${this.mod.c_modulename + colName}' type='button'>${provinceName} ${cityName} ${countryName} </button>
                    <input type='hidden' id='${this.mod.c_modulename + colName}' name='${colName}' value='${provinceValue},${cityValue},${countryValue}' />`;
        } else { //二级联动
            let provinceValue = query[sets] || '-1';
            let cityValue = query[colName] || '-1';
            let areaModel = cmpage.service('admin/area');
            let provinceName = await areaModel.getProvinceName(provinceValue);
            let cityName = await areaModel.getCityName(cityValue);
            ret = `<button class='mui-btn mui-btn-block cmpage-picker-country' style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'
                        data-ref='${this.mod.c_modulename + colName}' type='button'>${provinceName} ${cityName} </button>
                    <input type='hidden' id='${this.mod.c_modulename + colName}' name='${colName}' value='${provinceValue},${cityValue}' />`;
        }
        return ret;
    }

    /**
     * 取业务模块中的查询列设置，组合成APP端HTML输出，为保持和PC端的一致性，一般不需要重写
     * @method  mobHtmlGetQuery
     * @return  {string}  HTML片段
     */
    async mobHtmlGetQuery() {
        let html = [];
        html.push(`<input type='hidden' name='modulename' id='modulename' value='${this.mod.c_modulename}' />`);
        html.push(`<input type='hidden' name='parmsUrl' id='parmsUrl' value='${JSON.stringify(this.mod.parmsUrl)}' />`);
        html.push("<input type='hidden' name='pageCurrent' value='1' />");
        html.push(`<input type='hidden' name='pageSize' value='8' />`);

        debug(this.mod.query, 'page_mob.mobHtmlGetQuery - this.mod.query');
        
        for (let md of this.modQuerys) {
            if (!think.isEmpty(this.mod.query[md.c_column])) {
                md.c_default = this.mod.query[md.c_column];
            }
            if (md.c_type === 'areaSelect' && think.isEmpty(md.c_memo)) { //未设置值的地区选择，忽略
                continue;
            }
            if (md.c_isshow && md.c_type !== 'fixed') //非 '固定' 类型且可显示的列
            {
                if (md.c_coltype === "bool") {
                    html.push("<div class='mui-input-row mui-checkbox'>");
                    html.push(`<label>${md.c_name}:</label>`);
                    html.push(`<input type='checkbox' name='${md.c_column}'${ md.c_default === 'true' ? " checked" : ""} />`);
                } else if (md.c_type === "select" || md.c_type === "selectMultiple") {
                    html.push("<div class='mui-input-row mui-select'>");
                    html.push(`<label>${md.c_name}:</label>`);
                    html.push(`<select name='${md.c_column}' >`);
                    html.push(await this.getOptions(md, true));
                    html.push("</select>");
                } else if (md.c_type === "areaSelect") {
                    html.push("<div class='mui-input-row'>");
                    html.push(`<label>地区选择:</label>${await this.mobGetAreaSelect(md.c_memo, md.c_column, this.query)}`);
                } else if (md.c_coltype == "datetime") {
                    let dateTitle = md.c_default; // DateTime.Parse(dr[edit.c_column].ToString()).ToString(md.c_format);
                    let dateType = {
                        type: 'date'
                    };
                    if (md.c_format.indexOf("HH:") >= 0) {
                        dateTitle = "选择时间 ...";
                        dateType = {
                            type: 'time'
                        };
                        if (md.c_format.indexOf("yyyy-") >= 0) {
                            dateTitle = "选择日期 ...";
                            dateType = {};
                        }
                    }
                    html.push("<div class='mui-input-row'>");
                    html.push(`<label>${md.c_name}:</label>`);
                    html.push(`<button data-options='${JSON.stringify(dateType)}' data-ref=' ${this.mod.c_modulename + md.c_column}' class='btn mui-btn mui-btn-block cmpage-picker-datetime'
                        style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'> ${dateTitle}</button>
                        <input type='hidden' id='${this.mod.c_modulename + md.c_column}' name='${md.c_column}' value='${ md.c_default}' />`);
                } else if (md.c_type == "lookup") {
                    let parmsUrl = cmpage.objFromString(md.c_memo); //形如：{modulename:'xxx', ...}
                    parmsUrl = think.isEmpty(parmsUrl) ? cmpage.parmsFromUrl(this.getReplaceToSpecialChar(md.c_memo)) : parmsUrl; //形如： /cmpage/page/lookup? ...
                    let inputHtml = `<button id='${md.c_column}' name='${md.c_column}' class='btn mui-btn mui-btn-block  mui-btn-warning mui-btn-outlined cmpage-btn-lookup'
                        data-parmsUrl='${ JSON.stringify(parmsUrl)}' data-modulename='${parmsUrl.modulename}'
                        style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'> ${md.c_default}</button>`;
                    debug(inputHtml, 'page_mob.mobHtmlGetQuery - lookup');
                    html.push("<div class='mui-input-row'>");
                    html.push(`<label>${md.c_name}:</label>`);
                    html.push(inputHtml);
                } else {
                    if (md.c_type != 'hidden') {
                        html.push("<div class='mui-input-row'>");
                        html.push(`<label>${md.c_name}:</label>`);
                    }
                    html.push(`<input name='${md.c_column}' type='${md.c_type}' value='${md.c_default}' class='mui-input-clear'  />`);
                }
                if (md.c_type != 'hidden') {
                    html.push("</div>");
                }
            }
        }
        return html.join(' ');
    }

    /**
     * 取业务模块中的编辑列设置，组合成APP端HTML输出，为保持和PC端的一致性，一般不需要重写
     * @method  mobHtmlGetEdit
     * @return  {string}  HTML片段
     */
    async mobHtmlGetEdit() {
        let html = [];
        let md = await this.getDataRecord();

        // cmpage.debug(md);
        html.push(`<input type='hidden' name='modulename' value='${this.mod.c_modulename}' />`);
        html.push(`<input name='old_record' type='hidden' value='${JSON.stringify(md)}' />`);
        for (let col of this.modEdits) {
            if (!col.c_editable) {
                continue;
            }
            let colValue = md[col.c_column];
            if (typeof (colValue) === 'undefined') {
                colValue = col.c_coltype === 'int' || col.c_coltype === 'float' ? 0 : (col.c_coltype === 'bool' ? false : '');
            }
            if (col.c_desc.indexOf('fn:') === 0) { //非数据库字段
                let its = col.c_desc.trim().split(':'); //设置如： fn:admin/code:getNameByPid:c_status
                let fnModel = cmpage.service(its[1]); //通过某个模块的某个方法取下拉设置
                if (think.isFunction(fnModel[its[2]])) {
                    if (its.length === 4) {
                        colValue = await fnModel[its[2]](md[its[3]]);
                    } else {
                        colValue = await fnModel[its[2]]();
                    }
                }
            }

            if (col.c_coltype === 'timestamp') {
                colValue = think.datetime(colValue);
            }
            if (col.c_type === "hidden") {
                html.push(`<input id="${col.c_column}" name="${col.c_column}" type="hidden" value="${colValue}" />`);
                continue;
            } else if (col.c_type === 'areaSelect' && think.isEmpty(col.c_memo)) { //未设置值的地区选择，忽略
                continue;
            }

            col.c_format = col.c_format.trim();

            let inputHtml = '';
            if (col.c_coltype === "datetime" || col.c_coltype === "date" || col.c_coltype === "timestamp") {
                //debug(col.c_format,'page_mob.mobHtmlGetEdit - datetime.col.c_format');
                //col.c_format = think.isEmpty(col.c_format) ? "yyyy-MM-dd" : col.c_format;
                //colValue =cmpage.datetime(colValue,col.c_format);
                let dateTitle = '';
                let dateType = {
                    type: 'date'
                };
                if (col.c_format.indexOf("HH:") >= 0) {
                    dateTitle = think.isEmpty(dateTitle) ? "选择时间 ..." : dateTitle;
                    dateType = {
                        type: 'time'
                    };
                    if (col.c_format.indexOf("yyyy-") >= 0) {
                        dateTitle = think.isEmpty(dateTitle) ? "选择日期 ..." : dateTitle;
                        dateType = {};
                    }
                } else {
                    colValue = colValue.substr(0, 10);
                }
                inputHtml = `<button data-options='${JSON.stringify(dateType)}' data-ref='${col.c_column}' class='btn mui-btn mui-btn-block cmpage-picker-datetime'
                        style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'> ${think.isEmpty(dateTitle) ? colValue : dateTitle}</button>
                        <input type='hidden' id='${col.c_column}' name='${col.c_column}' value='${colValue}' />`;
                //debug(inputHtml,'page_mob.mobHtmlGetEdit - datetime.inputHtml');
            } else if (col.c_type === "select" || col.c_type === "selectMultiple") {
                col.c_default = colValue;
                inputHtml = `<select id='${col.c_column}' name='${col.c_column}' > ${await this.getOptions(col, !col.c_isrequired )} </select>`;
            } else if (col.c_type === "textarea") {
                inputHtml = `<textarea  id='${col.c_column}' name='${col.c_column}'  rows="4" >${colValue}</textarea>`;
            } else if (col.c_type === "checkbox") {
                inputHtml = `<input type='checkbox' id='${col.c_column}' name='${col.c_column}'  ${colValue ? " checked" : ""} />`;
            } else if (col.c_type == "areaSelect") {
                inputHtml = await this.mobGetAreaSelect(col.c_memo, col.c_column, this.rec);
            } else if (col.c_type === "readonly") {
                inputHtml = `<input id='${col.c_column}' name='${col.c_column}'  class='mui-input-clear mui-input' type="text" value="${colValue}"  readonly="readonly"  />`;
            } else if (col.c_type === "lookup") {
                let parmsUrl = cmpage.objFromString(col.c_memo); //形如：{modulename:'xxx', ...}
                parmsUrl = think.isEmpty(parmsUrl) ? cmpage.parmsFromUrl(this.getReplaceToSpecialChar(col.c_memo)) : parmsUrl; //形如： /cmpage/page/lookup? ...
                inputHtml = `<button id='${col.c_column}' name='${col.c_column}' class='btn mui-btn mui-btn-block  mui-btn-warning mui-btn-outlined cmpage-btn-lookup'
                    data-parmsUrl='${ JSON.stringify(parmsUrl)}' data-modulename='${parmsUrl.modulename}'
                    style='width:65%; border:none; text-align:left; padding-left:0px; height:100%;'> ${colValue}</button>`;
                debug(inputHtml, 'page_mob.mobHtmlGetEdit - lookup');
            } else if (col.c_type === "text") {
                inputHtml = `<input id='${col.c_column}' name='${col.c_column}'  class='mui-input-clear mui-input' type="text" value="${colValue}"   />`;
            }

            if (inputHtml.length > 0) {
                inputHtml = await this.mobHtmlGetEditInput(col, colValue, inputHtml);
            }

            if (col.c_type !== "hidden") {
                html.push(`<div class='mui-input-row ${col.c_type === "select" ? "mui-select" : (col.c_coltype === "bool" ? "mui-checkbox":"")}'>`);
                html.push(`<label>${col.c_name.trim()}:</label>`);
                html.push(`${inputHtml}</div>`);
            }
        }
        return html.join(' ');
    }

    /**
     * 改变某些编辑列的样式，子类中可以重写本方法类增加模块编辑页面的操作逻辑
     * @method  mobHtmlGetEditInput
     * @return {string} Edit页面的Input的HTML片段
     * @params {object} col Edit页面的当前编辑列设置
     * @params {string} colValue Input的值
     * @params {string} input Edit页面的Input的HTML片段
     */
    async mobHtmlGetEditInput(col, colValue, input) {
        //增加模块编辑页面的操作逻辑，也可以配合页面js方法

        return input;
    }
    async mobHtmlGetView() {
        console.log("----------mobHtmlGetView------------")
        let html = [];
        let rec = await this.getDataRecord();
        debug(rec,'page_mob.mobHtmlGetView - rec');

        html.push("<ul class='mui-table-view mui-table-view-chevron'>");
        html.push("<input type='hidden' name='modulename' value='" + this.mod.c_modulename + "' />");
        for (let col of this.modCols) {
            if (!col.c_isview) continue;
            let value = rec[col.c_column];
            if (col.c_type === "replace" && !(/^select/.test(col.c_memo))) {
                value = await this.getReplaceText(value, col.c_memo);
            } else if (col.c_coltype === 'timestamp') {
                value = cmpage.datetime(value, col.c_format);
            }
            html.push(`<div class='mui-col-sm-12 mui-col-xs-12 mui-input-row ${col.c_type == "select" ? "mui-select" : (col.c_coltype == "bit" ? "mui-checkbox" : "")}'>`);
            html.push(`<label>${col.c_name}: </label>`);
            // html.push(`<input type='text' readonly=readonly value='${value}' />`);
            html.push(`<a class='content'>${value}</a>`);
            html.push("</div>");
            
        }
        html.push("</ul>");
        return html.join('');
    }

    /**********************************以下是H5页面不同的部分,hh开头的方法************************************************************** */
    /**
     * H5生成列表底部按钮组HTML输出，一般在子类中通过重写这个方法来达到定制输出按钮的效果
     * @method  hhGetHeaderBtnsFromModule
     * @return  {string}  HTML片段
     */
    async hhGetHeaderBtnsFromModule() {
        let html = [];
        for (let btn of this.modBtns) {
            if (btn.c_location <= 10 && btn.c_isshow) {
                if (btn.c_object.indexOf(".Add") > 0) {
                    html.push(`<a class='mui-tab-item cmpage-btn-add' href='/cmpage/hh/edit?modulename=${this.mod.c_modulename}&id=0'
                        data-type='edit' data-parmsUrl='${JSON.stringify(this.mod.parmsUrl)}'  data-id='0' >            
                        <span class='mui-icon mui-icon-plus'></span>
                        <span class='mui-tab-label'>新增</span>
                    </a>`);
                }
            }
        }
        return html;
    }
    async hhGetHeaderBtns() {
        let html = await this.hhGetHeaderBtnsFromModule();

        return `<a id="listTabIcon" class="mui-tab-item mui-active" href="#listTab">
				<span class="mui-icon mui-icon-list"></span>
				<span class="mui-tab-label">列表</span>
			</a>
			<a class="mui-tab-item" href="#searchTab">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查询</span>
			</a>${html.join('')}`;
    }
}