
$(function(){


  init();

})
function init(){



  var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

  //各医院门诊人次
  var histogramChart1 = echarts.init(document.getElementById('histogramChart1'));
  histogramChart1.setOption({

     grid: {
         top: '10%',
         left: '32%'
     },
     xAxis: {
         show: false
     },
     yAxis: [{
         show: true,
         data:  ['桃新大道','塔田村安置房','邓埠村工程','银三角良种场','富山乡三山村'],
         inverse: true,
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLabel: {
             color: '#fff',
             formatter: (value, index) => {
                 return [

                     `{lg|${index+1}}  ` + '{title|' + value + '} '
                 ].join('\n')
             },
             rich: {
                 lg: {
                     backgroundColor: '#339911',
                     color: '#fff',
                     borderRadius: 15,
                     // padding: 5,
                     align: 'center',
                     width: 15,
                     height: 15
                 },
             }
         },


     }, {
         show: true,
         inverse: true,
         data: [200, 200, 200, 200, 200],
         axisLabel: {
             textStyle: {
                 fontSize: 12,
                 color: '#fff',
             },
         },
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },

     }],
     series: [{
         name: '条',
         type: 'bar',
         yAxisIndex: 0,
         data: [80, 50, 30, 20,20],
         barWidth: 10,
         itemStyle: {
             normal: {
                 barBorderRadius: 20,
                 color: function(params) {
                     var num = myColor.length;
                     return myColor[params.dataIndex % num]
                 },
             }
         },
         label: {
             normal: {
                 show: true,
                 position: 'inside',
                 formatter: '{c}%'
             }
         },
     }, {
         name: '框',
         type: 'bar',
         yAxisIndex: 1,
         barGap: '-100%',
         data: [100, 100, 100, 100,100],
         barWidth: 15,
         itemStyle: {
             normal: {
                 color: 'none',
                 borderColor: '#00c1de',
                 borderWidth: 3,
                 barBorderRadius: 15,
             }
         }
     }, ]
  })

  //各医院住院人次
  var histogramChart2 = echarts.init(document.getElementById('histogramChart2'));
  histogramChart2.setOption({

     grid: {
         top: '10%',
         left: '32%'
     },
     xAxis: {
         show: false
     },
     yAxis: [{
         show: true,
         data:  ['桃新大道','塔田村安置房','邓埠村工程','银三角良种场','富山乡三山村'],
         inverse: true,
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },
         axisLabel: {
             color: '#fff',
             formatter: (value, index) => {
                 return [

                     `{lg|${index+1}}  ` + '{title|' + value + '} '
                 ].join('\n')
             },
             rich: {
                 lg: {
                     backgroundColor: '#339911',
                     color: '#fff',
                     borderRadius: 15,
                     // padding: 5,
                     align: 'center',
                     width: 15,
                     height: 15
                 },
             }
         },


     }, {
         show: true,
         inverse: true,
         data: [2200, 2400, 2600, 2800,3000],
         axisLabel: {
             textStyle: {
                 fontSize: 12,
                 color: '#fff',
             },
         },
         axisLine: {
             show: false
         },
         splitLine: {
             show: false
         },
         axisTick: {
             show: false
         },

     }],
     series: [{
         name: '条',
         type: 'bar',
         yAxisIndex: 0,
         data:  [22, 24, 26, 28,30],
         barWidth: 10,
         itemStyle: {
             normal: {
                 barBorderRadius: 20,
                 color: function(params) {
                     var num = myColor.length;
                     return myColor[params.dataIndex % num]
                 },
             }
         },
         label: {
             normal: {
                 show: true,
                 position: 'inside',
                 formatter: '{c}%'
             }
         },
     }, {
         name: '框',
         type: 'bar',
         yAxisIndex: 1,
         barGap: '-100%',
         data: [100, 100, 100, 100,100],
         barWidth: 15,
         itemStyle: {
             normal: {
                 color: 'none',
                 borderColor: '#00c1de',
                 borderWidth: 3,
                 barBorderRadius: 15,
             }
         }
     }, ]
  })

    //手术工作量
    var pieChart1 = echarts.init(document.getElementById('pieChart1'));
    pieChart1.setOption({
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
       trigger: 'item',
       formatter: "{a}<br/>{b}<br/>{c}%"
      },
      calculable : true,
      series : [
          {
              name:'风险指标分布',
              type:'pie',
              radius : [30, 110],
              center : ['50%', '50%'],
              roseType : 'area',
              x: '50%',
              max: 40,
              sort : 'ascending',
              data:[
                  {value:10, name:'储存风险'},
                  {value:5, name:'价格风险'},
                  {value:15, name:'趋势风险'},
                  {value:25, name:'供应链风险'},
              ]
          }
      ]
    })

    //价格走势
    var lineChart1 = echarts.init(document.getElementById('lineChart1'));
    lineChart1.setOption( {
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
           trigger: 'item',
           formatter: "{a}<br/>{b}<br/>{c}元"
       },
       legend: {
        data:['钢材','钢筋','混凝土','加气块',],
        y: 240,
        x:'center',
        textStyle:{
            color:'#fff',
            fontSize:12
        }
      },
      grid:{
        top:'5%',
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "元/吨"
                  },
              },
          }
      ],
      series : [
          {
              name:'钢材',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[500, 498, 510, 500, 504, 506, 509]
          },
          {
              name:'钢筋',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[300, 312, 334, 291, 290, 300, 310]
          },
          {
              name:'混凝土',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[3320, 3132, 2601, 2234, 2320, 2190, 2200]
          },
          {
              name:'加气块',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[4320, 4132, 3961, 3934, 3820, 3900, 3800]
          }
      ]

    })

    //入仓数量
    var lineChart2 = echarts.init(document.getElementById('lineChart2'));
    lineChart2.setOption( {
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
           trigger: 'item',
           formatter: "{a}<br/>{b}<br/>{c}人"
       },
       legend: {
        data:['钢材','钢筋','混凝土','加气块',],
        y: 240,
        x:'center',
        textStyle:{
            color:'#fff',
            fontSize:12
        }
      },
      grid:{
        top:'5%',
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "KG"
                  },
              },
          }
      ],
      series : [
          {
              name:'钢材',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1200, 1220, 2210, 5240, 4600, 5300, 6100]
          },
          {
              name:'钢筋',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[1300, 6820, 5340, 6910, 4900, 1300, 1100]
          },
          {
              name:'混凝土',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[3200, 1320, 1610, 1340, 1120, 1900, 1200]
          },
          {
              name:'加气块',
              type:'line',
              smooth:true,
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data:[3200, 1320, 4610, 340, 2020, 930, 2220]
          }
      ]

    })

    //床位数量分布
    var pieChart2 = echarts.init(document.getElementById('pieChart2'));
    pieChart2.setOption({
      color:["#87cefa","#ff7f50","#32cd32","#da70d6",],
      tooltip : {
       trigger: 'item',
       formatter: "{a}<br/>{b}<br/>{c}"
      },
      calculable : true,
      series : [
          {
              name:'仓单质押项目分布',
              type:'pie',
              radius : [30, 110],
              center : ['45%', '50%'],
              roseType : 'area',
              x: '50%',
              max: 40,
              sort : 'ascending',
              data:[
                  {value:70, name:'申请中'},
                  {value:50, name:'评审中'},
                  {value:10, name:'已放款'},
                  {value:25, name:'已签署'},
              ]
          }
      ]
    })

    //
    var histogramChart3 = echarts.init(document.getElementById('histogramChart3'));
    histogramChart3.setOption( {

      color:['#f13838'],
      grid:{
        top:'5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      tooltip : {
         trigger: 'item',
         formatter: "{a}<br/>{b}<br/>{c}%"
     },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['桃新大道','塔田村安置房','邓埠村工程','银三角良种场','富山乡三山村'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#f13838'
                  },
              },
              max:100,
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "%"
                  },
              },
          }
      ],
      series : [
          {
              name:'风险概率',
              type:'bar',
              barWidth:30,
              data:[20,15,12,18,10],
          },
      ]
    });

    //平均住院天数
    var histogramChart4 = echarts.init(document.getElementById('histogramChart4'));
    histogramChart4.setOption( {
      color:['#87cefa'],
      grid:{
          top:'5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
      },
      tooltip : {
         trigger: 'item',
         formatter: "{a}<br/>{b}<br/>{c}天"
     },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              data : ['桃新大道','塔田村安置房','邓埠村工程','银三角良种场','富山乡三山村'],
              axisLine:{
                   lineStyle:{
                       color: '#87cefa'
                   },
               },
               axisLabel : {
                 interval:0,
                 rotate:40,

                   textStyle: {
                       color: '#fff',
                       fontSize:13
                   }
               }
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLine:{
                  lineStyle:{
                      color: '#87cefa'
                  },
              },
              splitLine: {
                  "show": false
              },
              axisLabel: {
                  textStyle: {
                      color: '#fff'
                  },
                  formatter: function (value) {
                      return value + "天"
                  },
              },
          }
      ],
      series : [
          {
              name:'平均储存天数',
              type:'bar',
              barWidth:30,
              data:[6,8,7,5,7],
          },
      ]
    });

}
