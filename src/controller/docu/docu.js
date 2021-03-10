'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**
 @module cmpage.controller
 */

/**
 * 业务模块展示及常用操作的URL接口
 * @class cmpage.controller.page
 */
const Base = require('./base.js');

module.exports = class extends Base {
    /**
     * 业务模块展示的全页面，加载所需的js文件等，调用page/list等URL展示具体内容，
     * 一般供外系统调用： /cmpage/page/index?method=list&modulename=xxx
     * @method  index
     * @return {promise}  HTML页面
     */
    async periodCalcAction() {
        //验证用户token，
        //取用户信息，写入session
        //显示页面
        let period = this.get('period');
        let stock = this.get('stock');
        console.log("----------------periodCalcAction-----------");
        console.log(period);
        console.log(stock);

        let ret = await cmpage.service('docu/period').periodCalc(period,stock);

        return this.json(ret);


    }


}