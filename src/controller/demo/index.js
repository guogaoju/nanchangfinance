'use strict';

const Base = require('../base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    //auto render template file index_index.html
    return this.display();
  }

  async setVIPAction(){
    let id = this.get("id");
    let ret = await cmpage.service('demo/customer').setVIP(id);
    return this.json(ret);
  }

}