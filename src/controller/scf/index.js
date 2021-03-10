'use strict';

const Base = require('./base.js');


const highArr = [19.2,3.9,8.6,7.6,22.5,1.8,9.8,2.6,59,108.5,6.4,23.9,111.6,26.2,22.8,17.4,2.6,9.9,3.6,21.7,2,12.3,2.7,59,119.6,8.1,18.2,114.2,24.2,30,16,5.1,14.4,4.3,18.8,2.1,21.4,2.4,59,153.5,12.9,20.2,110.3,18.4,17.9];
const middleArr_1 = [12,3.2,7.5,6.3,15.2,1.6,8,2.1,65,102,16.6,15.5,107.4,15.6,16.3,11.2,1.9,8.3,3.1,13.1,1.4,8,2.1,65,108.5,11.3,12.2,108.3,13.6,21.7,10.2,3.4,13.2,2.3,12.8,1.4,11.2,1.9,65,122.3,22.7,10.4,105.2,5.9,10.5];
const middleArr_2 = [6.3,2.4,5.1,5.4,10,1.2,6.5,1.5,70,92.6,29,6.3,103.7,9.1,12.3,4.1,1,4.7,1.9,6.5,1.1,5.2,1.5,70,89.9,21.1,5.3,102.6,6.7,16.6,2.7,1.7,6.9,0.7,7.1,0.6,4.9,0.9,70,86.9,33.5,1,100.2,0.4,4];
const middleArr_3 = [1.7,0.7,3.9,4,2.7,0.9,5.2,1.3,85,79.2,38.8,-5,101,-13.2,3.3,-1.8,0.2,3.3,-0.2,-1.3,0.8,5.1,1.3,85,78.1,32,-14.7,97.3,-11.8,0.9,-3.1,-1.2,4.9,-2.9,-4.2,0.4,4.2,0.7,85,67.4,48.3,-14.8,96.4,-13.7,-14.3];
const lowArr = [-2.3,-0.7,2.3,3.3,-0.8,0.2,3.6,0.8,90,67,52.6,-12.6,100,-26,-6.1,-4.3,-19,1.8,-2.9,-4.6,0.4,3.1,0.8,90,61,43.5,-27.5,95,-23.4,-7.8,-7.4,-2.7,1.5,-9.4,12.6,0.1,2.8,0.5,90,43.1,62.2,-27.8,91.4,-26,-32.1];


module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async update_rankAction(){

      var id = this.get('id');
      let model = cmpage.service('cmpage/base');
      console.log(id);
      let ranklist = await model.query(`select c_uid,c_year,c_quarter from t_scf_rank where id=${id} limit 1`);
      console.log(ranklist);
      console.log(ranklist[0].c_year);
      console.log(ranklist[0].c_quarter);
      console.log("-------------");

      var pre_year = ranklist[0].c_year-1;
      var pre_quarter = 1337;

      let supplierData = await model.query(`select c_type from t_scf_supplierinfo where c_uid=${ranklist[0].c_uid} limit 1`);
      if(supplierData.length<1){
        return this.json({
            statusCode: '300',
            message: "供应商不存在，请联系客服！"
        });
      }
      var supplier_type = 0;
      if(supplierData[0].c_type==116){
        supplier_type = 0;
      }else if(supplierData[0].c_type==117){
        supplier_type = 1;
      }else{
        supplier_type = 2;
      }

      let dingxingData = await model.query(`select c_value1,c_value2,c_value3,c_value4,c_value5,c_value6,c_value7,c_value8,c_value9,c_value10,c_value11,c_value12,c_value13,c_value14 from t_scf_dingxingbiao where c_uid=${ranklist[0].c_uid} and c_year=${ranklist[0].c_year} and c_quarter=${ranklist[0].c_quarter} and c_status=1 limit 1`);
      console.log(dingxingData);
      console.log(dingxingData.length);
      if(dingxingData.length<1){
        return this.json({
            statusCode: '300',
            message: "未找到定性表数据，请补充！"
        });
      }

      let pre_zichanfuzhaiData = await model.query(`select c_syzhqy,c_zchzj,c_shshzbje,c_yshzk,c_ldzchhj,c_fzhzj,c_ldfzhhj,c_ldzchhj,c_ck,c_yfzhk,c_dqchqzhtz,c_yndqchqfz,c_dqjk,c_chqjk,c_yfzq from t_scf_zichanfuzhai where c_uid=${ranklist[0].c_uid} and c_year=${pre_year} and c_quarter=${pre_quarter} and c_status=1 limit 1`);
      console.log(pre_zichanfuzhaiData);
      console.log(pre_zichanfuzhaiData.length);
      if(pre_zichanfuzhaiData.length<1){
        return this.json({
            statusCode: '300',
            message: "未找到去年第四季度资产负债表，请补充！"
        });
      }

      let pre_lirunData = await model.query(`select c_jlr,c_lrze,c_zywwshr,c_yylr from t_scf_lirunbiao where c_uid=${ranklist[0].c_uid} and c_year=${pre_year} and c_quarter=${pre_quarter} and c_status=1 limit 1`);
      console.log(pre_lirunData);
      console.log(pre_lirunData.length);
      if(pre_lirunData.length<1){
        return this.json({
            statusCode: '300',
            message: "未找到去年第四季度利润表，请补充！"
        });
      }

      let zichanfuzhaiData = await model.query(`select c_syzhqy,c_zchzj,c_shshzbje,c_yshzk,c_ldzchhj,c_fzhzj,c_ldfzhhj,c_ldzchhj,c_ck,c_yfzhk,c_dqchqzhtz,c_yndqchqfz,c_dqjk,c_chqjk,c_yfzq from t_scf_zichanfuzhai where c_uid=${ranklist[0].c_uid} and c_year=${ranklist[0].c_year} and c_quarter=${ranklist[0].c_quarter} and c_status=1 limit 1`);
      console.log(zichanfuzhaiData);
      console.log(zichanfuzhaiData.length);
      if(zichanfuzhaiData.length<1){
        return this.json({
            statusCode: '300',
            message: "未找到当前资产负债表，请补充！"
        });
      }

      let lirunData = await model.query(`select c_jlr,c_lrze,c_zywwshr,c_zhyywchb,c_zhyywshj,c_yyjy,c_glfy,c_cwfy,c_sdsh,c_yylr from t_scf_lirunbiao where c_uid=${ranklist[0].c_uid} and c_year=${ranklist[0].c_year} and c_quarter=${ranklist[0].c_quarter} and c_status=1 limit 1`);
      console.log(lirunData);
      console.log(lirunData.length);
      if(lirunData.length<1){
        return this.json({
            statusCode: '300',
            message: "未找到当前利润表，请补充！"
        });
      }
      
      // let biaowaiData = await model.query(`select c_lxzhch from t_scf_biaowaishuju where c_uid=${ranklist[0].c_uid} and c_year=${ranklist[0].c_year} and c_quarter=${ranklist[0].c_quarter} limit 1`);
      // console.log(biaowaiData);
      // console.log(biaowaiData.length);
      // if(biaowaiData.length<1){
      //   return this.json({
      //       statusCode: '300',
      //       message: "未找到当前表外数据表，请补充！"
      //   });
      // }

      var i_JZCHSHYL = await this.getValue(lirunData[0].c_jlr,zichanfuzhaiData[0].c_syzhqy);
      var i_ZZCHBCHL = await this.getValue(lirunData[0].c_lrze,zichanfuzhaiData[0].c_zchzj);
      var i_XSHLRL = await this.getValue(lirunData[0].c_yylr,lirunData[0].c_zywwshr);
      var i_CBFYLRL = await this.getValue(lirunData[0].c_lrze,lirunData[0].c_zhyywchb+lirunData[0].c_zhyywshj+lirunData[0].c_yyjy+lirunData[0].c_glfy+lirunData[0].c_cwfy+lirunData[0].c_sdsh);
      var i_ZBSYL = await this.getValue(lirunData[0].c_jlr,zichanfuzhaiData[0].c_shshzbje);

      var i_ZZCHZHZHL = await this.getValue(lirunData[0].c_zywwshr,zichanfuzhaiData[0].c_zchzj);
      var i_YSHZHKZHZHL = await this.getValue(lirunData[0].c_zywwshr,zichanfuzhaiData[0].c_yshzk);
      var i_LDZCHZHZHL = await this.getValue(lirunData[0].c_zywwshr,zichanfuzhaiData[0].c_ldzchhj);
      var i_ZCHFZHL = await this.getValue(zichanfuzhaiData[0].c_fzhzj,zichanfuzhaiData[0].c_zchzj);
      var i_SDBL = await this.getValue(zichanfuzhaiData[0].c_ldzchhj-zichanfuzhaiData[0].c_ck-zichanfuzhaiData[0].c_yfzhk-zichanfuzhaiData[0].c_dqchqzhtz-zichanfuzhaiData[0].c_yndqchqfz,zichanfuzhaiData[0].c_ldfzhhj);

      var i_DXFZHBL = await this.getValue(zichanfuzhaiData[0].c_dqjk+zichanfuzhaiData[0].c_yndqchqfz+zichanfuzhaiData[0].c_chqjk+zichanfuzhaiData[0].c_yfzq+lirunData[0].c_cwfy,zichanfuzhaiData[0].c_fzhzj);
      var i_XSHZZHL = await this.getValue(lirunData[0].c_zywwshr-pre_lirunData[0].c_zywwshr,pre_lirunData[0].c_zywwshr);
      var i_ZBBZHZZHL = await this.getValue(zichanfuzhaiData[0].c_syzhqy,pre_zichanfuzhaiData[0].c_syzhqy);
      var i_XSHLRZZHL = await this.getValue(lirunData[0].c_yylr-pre_lirunData[0].c_yylr,pre_lirunData[0].c_yylr);
      var i_ZZCHZZHL = await this.getValue(zichanfuzhaiData[0].c_zchzj-pre_zichanfuzhaiData[0].c_zchzj,pre_zichanfuzhaiData[0].c_zchzj);

      console.log(i_JZCHSHYL);
      console.log(i_ZZCHBCHL);
      console.log(i_XSHLRL);
      console.log(i_CBFYLRL);
      console.log(i_ZBSYL);

      console.log(i_ZZCHZHZHL);
      console.log(i_YSHZHKZHZHL);
      console.log(i_LDZCHZHZHL);
      console.log(i_ZCHFZHL);
      console.log(i_SDBL);

      console.log(i_DXFZHBL);
      console.log(i_XSHZZHL);
      console.log(i_ZBBZHZZHL);
      console.log(i_XSHLRZZHL);
      console.log(i_ZZCHZZHL);

      var i_JZCHSHYL_score = await this.cauculate(i_JZCHSHYL,highArr[supplier_type*15],middleArr_1[supplier_type*15],middleArr_2[supplier_type*15],middleArr_3[supplier_type*15],lowArr[supplier_type*15]);
      var i_ZZCHBCHL_score = await this.cauculate(i_ZZCHBCHL,highArr[supplier_type*15+1],middleArr_1[supplier_type*15+1],middleArr_2[supplier_type*15+1],middleArr_3[supplier_type*15+1],lowArr[supplier_type*15+1]);
      var i_XSHLRL_score = await this.cauculate(i_XSHLRL,highArr[supplier_type*15+2],middleArr_1[supplier_type*15+2],middleArr_2[supplier_type*15+2],middleArr_3[supplier_type*15+2],lowArr[supplier_type*15+2]);
      var i_CBFYLRL_score = await this.cauculate(i_CBFYLRL,highArr[supplier_type*15+3],middleArr_1[supplier_type*15+3],middleArr_2[supplier_type*15+3],middleArr_3[supplier_type*15+3],lowArr[supplier_type*15+3]);
      var i_ZBSYL_score = await this.cauculate(i_ZBSYL,highArr[supplier_type*15+4],middleArr_1[supplier_type*15+4],middleArr_2[supplier_type*15+4],middleArr_3[supplier_type*15+4],lowArr[supplier_type*15+4]);

      var i_ZZCHZHZHL_score = await this.cauculate(i_ZZCHZHZHL,highArr[supplier_type*15+5],middleArr_1[supplier_type*15+5],middleArr_2[supplier_type*15+5],middleArr_3[supplier_type*15+5],lowArr[supplier_type*15+5]);
      var i_YSHZHKZHZHL_score = await this.cauculate(i_YSHZHKZHZHL,highArr[supplier_type*15+6],middleArr_1[supplier_type*15+6],middleArr_2[supplier_type*15+6],middleArr_3[supplier_type*15+6],lowArr[supplier_type*15+6]);
      var i_LDZCHZHZHL_score = await this.cauculate(i_LDZCHZHZHL,highArr[supplier_type*15+7],middleArr_1[supplier_type*15+7],middleArr_2[supplier_type*15+7],middleArr_3[supplier_type*15+7],lowArr[supplier_type*15+7]);
      var i_ZCHFZHL_score = await this.cauculate(i_ZCHFZHL,highArr[supplier_type*15+8],middleArr_1[supplier_type*15+8],middleArr_2[supplier_type*15+8],middleArr_3[supplier_type*15+8],lowArr[supplier_type*15+8]);
      var i_SDBL_score = await this.cauculate(i_SDBL,highArr[supplier_type*15+9],middleArr_1[supplier_type*15+9],middleArr_2[supplier_type*15+9],middleArr_3[supplier_type*15+9],lowArr[supplier_type*15+9]);

      var i_DXFZHBL_score = await this.cauculate(i_DXFZHBL,highArr[supplier_type*15+10],middleArr_1[supplier_type*15+10],middleArr_2[supplier_type*15+10],middleArr_3[supplier_type*15+10],lowArr[supplier_type*15+10]);
      var i_XSHZZHL_score = await this.cauculate(i_XSHZZHL,highArr[supplier_type*15+11],middleArr_1[supplier_type*15+11],middleArr_2[supplier_type*15+11],middleArr_3[supplier_type*15+11],lowArr[supplier_type*15+11]);
      var i_ZBBZHZZHL_score = await this.cauculate(i_ZBBZHZZHL,highArr[supplier_type*15+12],middleArr_1[supplier_type*15+12],middleArr_2[supplier_type*15+12],middleArr_3[supplier_type*15+12],lowArr[supplier_type*15+12]);
      var i_XSHLRZZHL_score = await this.cauculate(i_XSHLRZZHL,highArr[supplier_type*15+13],middleArr_1[supplier_type*15+13],middleArr_2[supplier_type*15+13],middleArr_3[supplier_type*15+13],lowArr[supplier_type*15+13]);
      var i_ZZCHZZHL_score = await this.cauculate(i_ZZCHZZHL,highArr[supplier_type*15+14],middleArr_1[supplier_type*15+14],middleArr_2[supplier_type*15+14],middleArr_3[supplier_type*15+14],lowArr[supplier_type*15+14]);

      console.log("--------------------------");
      console.log(i_JZCHSHYL_score);
      console.log(i_ZZCHBCHL_score);
      console.log(i_XSHLRL_score);
      console.log(i_CBFYLRL_score);
      console.log(i_ZBSYL_score);

      console.log(i_ZZCHZHZHL_score);
      console.log(i_YSHZHKZHZHL_score);
      console.log(i_LDZCHZHZHL_score);
      console.log(i_ZCHFZHL_score);
      console.log(i_SDBL_score);

      console.log(i_DXFZHBL_score);
      console.log(i_XSHZZHL_score);
      console.log(i_ZBBZHZZHL_score);
      console.log(i_XSHLRZZHL_score);
      console.log(i_ZZCHZZHL_score);
      console.log("--------------------------");

      var strSql = `select c_desc from t_code where id in (${dingxingData[0].c_value1},${dingxingData[0].c_value2},${dingxingData[0].c_value3},${dingxingData[0].c_value4},${dingxingData[0].c_value5},${dingxingData[0].c_value6},${dingxingData[0].c_value7},${dingxingData[0].c_value8},${dingxingData[0].c_value9},${dingxingData[0].c_value10},${dingxingData[0].c_value11},${dingxingData[0].c_value12},${dingxingData[0].c_value13},${dingxingData[0].c_value14})`;




      let score = await model.query(strSql);
      console.log(score);
      console.log(score.length);


      var i_LSHBJ_score = (parseInt(score[0].c_desc)+parseInt(score[1].c_desc)+parseInt(score[2].c_desc))/3;
      var i_ZZHGL_score = (parseInt(score[3].c_desc)+parseInt(score[4].c_desc)+parseInt(score[5].c_desc))/3;
      var i_QYJZHL_score = (parseInt(score[6].c_desc)+parseInt(score[7].c_desc)+parseInt(score[8].c_desc)+parseInt(score[9].c_desc)+parseInt(score[10].c_desc)+parseInt(score[11].c_desc))/6;
      var i_XYZHK_score = (parseInt(score[12].c_desc)+parseInt(score[13].c_desc))/2;
      console.log(i_LSHBJ_score);
      console.log(i_ZZHGL_score);
      console.log(i_QYJZHL_score);
      console.log(i_XYZHK_score);
      console.log("----------------------------");

      var c_quality_score = ((i_LSHBJ_score+i_ZZHGL_score+i_QYJZHL_score+i_XYZHK_score)/4).toFixed(2);
      var c_quantity_score = ((parseFloat(i_JZCHSHYL_score)+parseFloat(i_ZZCHBCHL_score)+parseFloat(i_XSHLRL_score)+parseFloat(i_CBFYLRL_score)+parseFloat(i_ZBSYL_score)+parseFloat(i_ZZCHZHZHL_score)+parseFloat(i_YSHZHKZHZHL_score)+parseFloat(i_LDZCHZHZHL_score)+parseFloat(i_ZCHFZHL_score)+parseFloat(i_SDBL_score)+parseFloat(i_DXFZHBL_score)+parseFloat(i_XSHZZHL_score)+parseFloat(i_ZBBZHZZHL_score)+parseFloat(i_XSHLRZZHL_score)+parseFloat(i_ZZCHZZHL_score))/15).toFixed(2);

      var rate = await this.getRateByCode(model);
      var c_level_score = c_quality_score*rate+(1-rate)*c_quantity_score;
      var c_rank = this.getRank(c_level_score);
      console.log(c_quality_score);
      console.log(c_quantity_score)
      console.log(c_level_score);
      console.log(c_rank)
      

      var sSql = `update t_scf_rank set c_quality_score=${c_quality_score},c_quantity_score=${c_quantity_score},c_level_score=${c_level_score},c_rank=${c_rank},i_JZCHSHYL=${i_JZCHSHYL},i_ZZCHBCHL=${i_ZZCHBCHL},i_XSHLRL=${i_XSHLRL},i_CBFYLRL=${i_CBFYLRL},i_ZBSYL=${i_ZBSYL},i_ZZCHZHZHL=${i_ZZCHZHZHL},i_YSHZHKZHZHL=${i_YSHZHKZHZHL},i_LDZCHZHZHL=${i_LDZCHZHZHL},i_ZCHFZHL=${i_ZCHFZHL},i_SDBL=${i_SDBL},i_DXFZHBL=${i_DXFZHBL},i_XSHZZHL=${i_XSHZZHL},i_ZBBZHZZHL=${i_ZBBZHZZHL},i_XSHLRZZHL=${i_XSHLRZZHL},i_ZZCHZZHL=${i_ZZCHZZHL},i_JZCHSHYL_score=${i_JZCHSHYL_score},i_ZZCHBCHL_score=${i_ZZCHBCHL_score},i_XSHLRL_score=${i_XSHLRL_score},i_CBFYLRL_score=${i_CBFYLRL_score},i_ZBSYL_score=${i_ZBSYL_score},i_ZZCHZHZHL_score=${i_ZZCHZHZHL_score},i_YSHZHKZHZHL_score=${i_YSHZHKZHZHL_score},i_LDZCHZHZHL_score=${i_LDZCHZHZHL_score},i_ZCHFZHL_score=${i_ZCHFZHL_score},i_SDBL_score=${i_SDBL_score},i_DXFZHBL_score=${i_DXFZHBL_score},i_XSHZZHL_score=${i_XSHZZHL_score},i_ZBBZHZZHL_score=${i_ZBBZHZZHL_score},i_XSHLRZZHL_score=${i_XSHLRZZHL_score},i_ZZCHZZHL_score=${i_ZZCHZZHL_score},i_LSHBJ_score=${i_LSHBJ_score},i_ZZHGL_score=${i_ZZHGL_score},i_QYJZHL_score=${i_QYJZHL_score},i_XYZHK_score=${i_XYZHK_score} where  c_uid=${ranklist[0].c_uid} and c_year=${ranklist[0].c_year} and c_quarter=${ranklist[0].c_quarter}`;

      await model.query(sSql);

      return this.json({
          statusCode: '200',
          message: "评分完成，请提交流程审核！"
      });
  }

// IF(AND(High>Low,myScore<Low),0,IF(AND(High>Low,myScore>High),100,IF(AND(High<Low,myScore<High),100,IF(AND(High<Low,myScore>Low),0,(IF(AND(High>Low,Low>0),100*(myScore-Low)/ABS(High-Low),IF(AND(High>Low,Low<0,myScore>0),100*(myScore+ABS(Low))/ABS(High-Low),IF(AND(High>Low,Low<0,myScore<0),100*ABS(myScore-Low)/ABS(High-Low),IF(AND(High<Low,Low>0),100*(1-(myScore-High)/ABS(High-Low)),1-(ABS(myScore-Low)/ABS(High-Low)))))))))))
  async cauculate(myScore,High,Middle1,Middle2,Middle3,Low){

    console.log("=========================");
    console.log(myScore);
    console.log(High);
    console.log(Middle1);
    console.log(Middle2);
    console.log(Middle3);
    console.log(Low);
    console.log("========================");

    var result = 0;

    if(High>Low && myScore<Low){
      result = 0;
    }else if(High>Low && myScore>High){
      result = 100;
    }else if(High<Low && myScore<High){
      result = 100;
    }else if(High<Low && myScore>Low){
      result = 0;
    }else if(High>Low && Low>0){
      result = 100*(myScore-Low)/Math.abs(High-Low);
    }else if(High>Low && Low<0 && myScore>0){
      result = 100*(myScore+Math.abs(Low))/Math.abs(High-Low);
    }else if(High>Low && Low<0 && myScore<0){
      result = 100*Math.abs(myScore-Low)/Math.abs(High-Low);
    }else if(High<Low && Low>0){
      result = 100*(1-(myScore-High)/Math.abs(High-Low));
    }else{
      result = 100*(1-(myScore-Low)/Math.abs(High-Low));
    }

    return result.toFixed(2);

  }

  async getValue(c_value1,c_value2){
    // console.log("---------------------------");
    // console.log(c_value1);
    // console.log(c_value2);
    return 100*(c_value1/c_value2);
  }

  async getRateByCode(model){
    var strSql = `select c_desc from t_code where id=1532 limit 1`;

      let params = await model.query(strSql);
      return params[0].c_desc;
  }

  getRank(score){
    var rank = 0;
    if(score>=90){
      rank = 1339;
    }else if(score>=85){
      rank = 1340
    }else if(score>=80){
      rank = 1341
    }else if(score>=75){
      rank = 1342
    }else if(score>=70){
      rank = 1343
    }else if(score>=60){
      rank = 1344
    }else if(score>=50){
      rank = 1345
    }else if(score>=40){
      rank = 1346
    }else if(score>=30){
      rank = 1347
    }else{
      rank = 1348
    }
    return rank;
  }


}












