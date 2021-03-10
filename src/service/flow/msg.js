'use strict';
// +----------------------------------------------------------------------
// | CmPage [ 通用页面框架 ]
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// +----------------------------------------------------------------------
// | Author: defans <defans@sina.cn>
// +----------------------------------------------------------------------
const wechat = require('wechat-enterprise');
const CMPage = require('../cmpage/page_mob.js');

module.exports = class extends CMPage {

    wechat_send(api,user_msg,msg){
        var deferred = think.defer();
        api.send(user_msg,msg,function(err,data,res) {
          if(err){
            deferred.reject(err);
          }else{
            deferred.resolve(data);
          }
        });
        return deferred.promise;
      }

    /**
     * 取查询项的设置，结合POST参数，得到Where字句
     */
    async getQueryWhere() {
        //通过父类的方法取查询列设置解析后的where子句
        let where = await super.getQueryWhere();
        //此处增加额外的条件
        where += ` and c_recv=${this.mod.user.id}`;

        return where;
    }

    /**
     * 得到去看看的URL,如果状态是未阅读，则改为已阅读
     */
    async goSeeSee(id) {

        let rec = await this.model('t_msg').where(`id=${id}`).find();
        if(rec){
            if(rec.c_status === 1){
                await this.query(`update t_msg set c_status=2 where id=${id}`);
            }
            //return {statusCode:200, message:'操作完成', data:rec};
            return {statusCode:200, message:'操作完成'};
        }else{
            return {statusCode:300, message:'记录不存在', data:null};
        }

    }

    async getUnReadCount(userID){
        let recvID = userID >0 ? userID : this.mod.user.id;
        let ret = await this.query(`select count(id) as cnt from t_msg where c_recv=${recvID} and c_status=1`);
        return {statusCode:200, message:'', data: ret[0].cnt};
    }


    async addMsgByType(c_modulename,c_type,c_way,c_link,id){
        let c_recv = 0;
        if(c_type==3){
            //角色
            c_recv = await cmpage.service('admin/user').getUserIdByRole(c_link);
        }else if(c_type==5){
            c_recv = c_link;
        }else if(c_type==6){
            c_recv = c_link;
        }

        await this.addMsg(c_recv,id,c_modulename,'',0);
    }

    async addMsg(userID,c_link,c_modulename,c_url,c_group){

        let mol = await cmpage.service('cmpage/module').getModuleByName(c_modulename);


        let rec = {
            c_msg_set:1,
            c_sender:1,
            c_recv:JSON.stringify(userID),
            c_url:c_url,
            c_title:"待审批",
            c_content:mol.c_alias+"中，您有一个新的审批",
            c_link:c_link,
            c_modulename:c_modulename,
            c_status:1,
            c_group:c_group,
            c_user:0
        }
        // console.log("=========================");
        // console.log(rec);
        // console.log(JSON.stringify(rec.url));
        // console.log("=========================");

        let recID = await this.model('t_msg').add(rec);

        await this.wx_send(userID,c_link,c_modulename,rec.c_content);
        // return {
        //     statusCode: recID > 0 ? 200 : 300,
        //     message: recID > 0 ? "操作成功" : "操作失败！"
        // };
    }

    async wx_send(userID,c_link,c_modulename,c_content){

        let wx_id = await cmpage.service('admin/user').getUserWXById(userID);
        if(wx_id==''){
            return;
        }

        this.qyapi = new wechat.API("ww0871dd9188474269", "DjcYPO9sd1VWckLbWIJEIeWl2tvF8_8vREb-gEm7ms8","1000002",async function(callback){
            let value = await think.cache("qyapi_access_token_app");
            console.log("----------value------------");
            console.log(value);
            callback(null, value);
          },async function(token, callback){
            console.log("----------token------------");
            console.log(token);
            await think.cache("qyapi_access_token_app",token,{
              timeout:3600
            });
            callback(null);
          });
        let user_msg = {"touser":wx_id};
          console.log("--------------user---------------");
          console.log(user_msg);
          let msg = {};

          msg = {
            "msgtype": "news",
            "news": {
              "articles": [{
                "title": '待审批',
                "description": c_content+"\n",
                "url": "http://scf.17koubei.com/cmpage/hh/show?modulename="+c_modulename+"&id="+c_link
              }
              ]
            },
            "safe":"0"
          };
          console.log("----------------wechat_send-------------");
          console.log(msg);
          await this.wechat_send(this.qyapi,user_msg,msg);

          //return {statusCode:200, message:'操作完成'};
    }

    async getStatus(id) {
        if (id == 1) {
            return `<label style="color:red;">未读</label>`;
        } else {
            return `<label style="color:green;">已读</label>`;
        }
    }
}