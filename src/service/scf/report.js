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
        //此处增加额外的条件
        if(user.c_role == 1108)
        {
          where += ` and  c_name="${user.c_name}"`; //也可以在查询列设置一条 ‘固定’类型的查询列，备注中填： c_status<>-1
        }
        
        debug(where);
        return where;
    }

}