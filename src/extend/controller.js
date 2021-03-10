'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------

/**

 @module cmpage.extend
 */

/**
 * controller的扩展类，在controller/xxx中可以直接引用
 * @class common.extend.controller
 */
module.exports = {
    success_bjui_doajax(msg, data) {
        let ret = {
            errno: 0,
            errmsg: '',
            statusCode: 200,
            message: msg,
            data: data,
            callback: ''
        };
        return this.json(ret);
    }
}