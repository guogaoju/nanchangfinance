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
     * 编辑页面保存,<br/>
     * 如果是多个表的数据产生的编辑页，则根据存在于this.mod.c_table中的列更新表，一般需要在子类中继承，例如： admin/user:pageSave
     * @method  pageSave
     * @param  {object} parms 前端传入的FORM参数
     */
    async pageSave(parms) {
        await super.pageSave(parms);
        console.log("--------------------");
        console.log(parms);
        console.log("--------------------");
        this.query(`update t_scf_biaowaishuju set c_status=1,c_time=current_timestamp where id=${parms.id}`);
    }

    

}