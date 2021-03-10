'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------
/**
 @module admin.service
 */

/**
 * 登录用户的操作类，提供一些操作t_scf_corecoinfo,t_scf_supplierinfo的方法
 * @class admin.service.scf
 */
const CMPage = require('../cmpage/page.js');

module.exports = class extends CMPage {

    /**
     * 根据用户ID取用户名称，一般用于页面模块配置中的‘替换’调用: admin/user:getNameById
     * @method  getNameById
     * @return {string}  用户名称
     * @param {int} id  用户ID
     */
    async getNameById(id) {
        let scfs = await this.getCoreScfs();
        for (let scf of scfs) {
            if (scf.id == id) {
                return scf.c_name;
            }
        }
        return '';
    }

    async getSupplierNameById(id) {
        let scfs = await this.getSupplierScfs();
        for (let scf of scfs) {
            if (scf.id == id) {
                return scf.c_name;
            }
        }
        return '';
    }

    async getSupplierNameByUid(uid) {
        let scfs = await this.getSupplierScfs();
        console.log(scfs);
        for (let scf of scfs) {
            if (scf.c_uid == uid) {
                return scf.c_name;
            }
        }
        return '';
    }
    /**
     * 根据用户ID取用户对象
     * @method  getNameById
     * @return {object}  用户对象
     * @param {int} id  用户ID
     */
    async getUserById(id) {
        let users = await this.getUsers();
        for (let user of users) {
            if (user.id == id) {
                return user;
            }
        }
        return {};
    }

    async getContractID(id){
        return id;
    }
    
    async getUidById(id){
        return id;
    }

    async getCoreScfs() {
        return await think.cache("scfcores", () => {
            //return this.model('vw_user').order('c_name').select();
            return this.query('select * from t_scf_corecoinfo order by c_name asc');
        });
    }

    async getSupplierScfs() {
        return await think.cache("scfs", () => {
            //return this.model('vw_user').order('c_name').select();
            return this.query('select * from t_scf_supplierinfo order by c_name asc');
        });
    }

    async update_rank(){
        // console.log("-----------------------");
        // console.log("-----------------------");
        // console.log("--------12312---------------");
        // console.log("-------------123123----------");
        // console.log("-----------4364563------------");
        // console.log("-------------769867856----------");
        
    }

    async getAlertLevel(c_score){
        if(c_score<40){
            return `<label style="color:red;">风险极高</label>`;
        } else if(c_score < 60){
            return `<label style="color:red;">风险较高</label>`;
        } else if(c_score < 80){
            return `<label style="color:red;">存在风险</label>`;
        } else {
            return `<label style="color:green;">风险较低</label>`;
        }
    }

    async getSCFSupplierCnt(){
        let cnt = await this.query('select count(1) as cnt from t_scf_supplierinfo');
        return cnt[0].cnt;
    }

    async getSCFRecieveCnt(){
        let cnt = await this.query('select count(1) as cnt from t_scf_recieve_business');
        return cnt[0].cnt;
    }

    async getSCFBuildCnt(){
        let cnt = await this.query('select count(1) as cnt from t_scf_build_business');
        return cnt[0].cnt;
    }

    async getSCFMoney(){
        let recieve = await this.query('select sum(c_finance_money) as cnt from t_scf_recieve_business');
        let build = await this.query('select sum(c_finance_money) as cnt from t_scf_build_business');

        let rec_money = 0;
        let build_money = 0;

        if(recieve[0].cnt){
            rec_money = recieve[0].cnt;
        }
        if(build[0].cnt){
            build_money = build[0].cnt;
        }
        return parseInt(rec_money) + parseInt(build_money);
    }

}