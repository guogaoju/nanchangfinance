$(function () {

    var tianjin = "/static/bigmap/page/data-1482909892121-BJ3auk-Se.json";

    var myChart = echarts.init(document.getElementById('chart_map'));
    $.get(tianjin, function(tjJson) {
        echarts.registerMap('shandong', tjJson);
        myChart.setOption({
            series: [{
                type: 'map',
                map: 'shandong'
            }]
        });

    var geoCoordMap = {
        '济南市':[117.121225,36.66466],
        '潍坊市':[119.1,36.62],
        '青岛市':[120.3,36.62],
        '烟台市':[120.9,37.32]

    };

    var goData = [
        [{name: '潍坊市'}, {id: 1,name: '济南市',value: 99}],
        [{name: '潍坊市'},{id: 1,name: '青岛市',value: 160}],
        [{name: '潍坊市'},{id: 1,name: '烟台市',value:100}],
      //   [{name:'蓟县'}, {name:'宁河',value:95}]
    ];
    //值控制圆点大小
    var backData = [
        [{name: '济南市'}, {id: 2,name: '潍坊市',value: 200}],
        [{name: '青岛市'}, { id: 2,name: '潍坊市',value: 200}],
    ];

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    var arcAngle = function(data) {
        var j, k;
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            if (dataItem[1].id == 1) {
                j = 0.2;
                return j;
            } else if (dataItem[1].id == 2) {
                k = -0.2;
                return k;
            }
        }
    }

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (dataItem[1].id == 1) {
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                    }, {
                        coord: toCoord,
                        value: dataItem[1].value //线条颜色

                    }]);
                }
            } else if (dataItem[1].id == 2) {
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord,
                    }, {
                        coord: toCoord
                    }]);
                }
            }
        }
        return res;
    };

    var color = ['#fff', '#FF1493', '#0000FF'];
    var series = [];
    [
        ['1', goData],
        ['2', backData]
    ].forEach(function(item, i) {
        series.push({
            name: item[0],
            type: 'lines',
            zlevel: 2,
            //线特效配置
            effect: {
                show: true,
                period: 6,
                trailLength: 0.1,
                symbol: planePath, //标记类型
                symbolSize: 10
            },
            lineStyle: {
                normal: {
                    width: 1,
                    opacity: 0.4,
                    curveness: arcAngle(item[1]), //弧线角度
                    color: '#fff'
                }
            },
            data: convertData(item[1])
        }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            //波纹效果
            rippleEffect: {
                period: 2,
                brushType: 'stroke',
                scale: 3
            },
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    position: 'right',
                    formatter: '{b}'
                }
            },
            //终点形象
            symbol: 'circle',
            //圆点大小
            symbolSize: function(val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    show: true
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
            })

        });

    });

    option = {
        backgroundColor: '',//#154e90
        
            title: {
            text: '',
            subtext: '',
            left: 'center',
            textStyle: {
                color: '#fff'
                
            },
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}"
        },
        //线颜色及飞行轨道颜色
        visualMap: {
            show: false,
            min: 0,
            max:300,
            color: ['#02e817', '#e80202', '#0233e8']
        },
        //地图相关设置
        geo: {
            map: 'shandong',
            //视角缩放比例
            zoom: 1,
            //显示文本样式
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            //鼠标缩放和平移
            roam: true,
            itemStyle: {
                normal: {
                    //          color: '#ddd',
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(   47,79,79, .2)' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)',
                    // shadowColor: 'rgba(255, 255, 255, 1)',
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            }
        },
        series: series
    };
 myChart.setOption(option);

})

    //echart_2湖南省高速公路
    function echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));

            myChart.setOption({
                series: [{
                    type: 'map',
                    mapType: 'hunan'
                }]
            });

            var geoCoordMap = {
                '怀化': [109.999867,27.518949],
                '吉首': [109.741528,28.332629],
                '张家界': [110.491722,29.112001],
                '常德': [111.701486,29.076683],
                '益阳': [112.348741,28.544124],
                '岳阳': [113.126486,29.382401],
                '长沙': [113.019455,28.200103],
                '株洲': [113.163141,27.8418],
                '湘潭': [112.91977,27.882141],
                '邵阳': [111.467859,27.21915],
                '娄底': [112.012438,27.745506],
                '衡阳': [112.63809,26.895225],
                '永州': [111.577632,26.460144],
                '郴州': [113.039396,25.81497]
            };

            var goData = [
                [{
                    name: '张家界'

                }, {
                    id: 1,
                    name: '常德',
                    value: 86
                }],
                [{
                    name: '吉首'

                }, {
                    id: 1,
                    name: '常德',
                    value: 86
                }],
                [{
                    name: '常德'

                }, {
                    id: 1,
                    name: '益阳',
                    value: 70
                }],
                [{
                    name: '益阳'

                }, {
                    id: 1,
                    name: '长沙',
                    value: 95
                }],
                [{
                    name: '长沙'

                }, {
                    id: 1,
                    name: '岳阳',
                    value: 70
                }],
                [{
                    name: '长沙'

                }, {
                    id: 1,
                    name: '湘潭',
                    value: 80
                }],
                [{
                    name: '长沙'

                }, {
                    id: 1,
                    name: '株洲',
                    value: 80
                }],
                [{
                    name: '长沙'

                }, {
                    id: 1,
                    name: '衡阳',
                    value: 80
                }],
                [{
                    name: '衡阳'

                }, {
                    id: 1,
                    name: '郴州',
                    value: 70
                }],
                [{
                    name: '衡阳'

                }, {
                    id: 1,
                    name: '永州',
                    value: 70
                }],
                [{
                    name: '湘潭'

                }, {
                    id: 1,
                    name: '娄底',
                    value: 60
                }],
                [{
                    name: '娄底'

                }, {
                    id: 1,
                    name: '邵阳',
                    value: 75
                }],
                [{
                    name: '邵阳'

                }, {
                    id: 1,
                    name: '怀化',
                    value: 75
                }],
            ];
            //值控制圆点大小
            var backData = [
                [{
                    name: '常德'

                }, {
                    id: 1,
                    name: '张家界',
                    value: 80
                }],
                [{
                    name: '常德'

                }, {
                    id: 1,
                    name: '吉首',
                    value: 66
                }],
                [{
                    name: '益阳'

                }, {
                    id: 1,
                    name: '常德',
                    value: 86
                }],
                [{
                    name: '长沙'

                }, {
                    id: 1,
                    name: '益阳',
                    value: 70
                }],
                [{
                    name: '岳阳'

                }, {
                    id: 1,
                    name: '长沙',
                    value: 95
                }],
                [{
                    name: '湘潭'

                }, {
                    id: 1,
                    name: '长沙',
                    value: 95
                }],
                [{
                    name: '株洲'

                }, {
                    id: 1,
                    name: '长沙',
                    value: 95
                }],
                [{
                    name: '衡阳'

                }, {
                    id: 1,
                    name: '长沙',
                    value: 95
                }],
                [{
                    name: '郴州'

                }, {
                    id: 1,
                    name: '衡阳',
                    value: 80
                }],
                [{
                    name: '永州'

                }, {
                    id: 1,
                    name: '衡阳',
                    value: 80
                }],
                [{
                    name: '娄底'

                }, {
                    id: 1,
                    name: '湘潭',
                    value: 80
                }],
                [{
                    name: '邵阳'

                }, {
                    id: 1,
                    name: '娄底',
                    value: 60
                }],
                [{
                    name: '怀化'

                }, {
                    id: 1,
                    name: '邵阳',
                    value: 75
                }],
            ];

            var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
            var arcAngle = function(data) {
                var j, k;
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if (dataItem[1].id == 1) {
                        j = 0.2;
                        return j;
                    } else if (dataItem[1].id == 2) {
                        k = -0.2;
                        return k;
                    }
                }
            }

            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (dataItem[1].id == 1) {
                        if (fromCoord && toCoord) {
                            res.push([{
                                coord: fromCoord,
                            }, {
                                coord: toCoord,
                                value: dataItem[1].value //线条颜色

                            }]);
                        }
                    } else if (dataItem[1].id == 2) {
                        if (fromCoord && toCoord) {
                            res.push([{
                                coord: fromCoord,
                            }, {
                                coord: toCoord
                            }]);
                        }
                    }
                }
                return res;
            };

            var color = ['#fff', '#FF1493', '#0000FF'];
            var series = [];
            [
                ['1', goData],
                ['2', backData]
            ].forEach(function(item, i) {
                series.push({
                    name: item[0],
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['arrow', 'arrow'],
                    //线特效配置
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0.1,
                        symbol: 'arrow', //标记类型
                        symbolSize: 5
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            opacity: 0.4,
                            curveness: arcAngle(item[1]), //弧线角度
                            color: '#fff'
                        }
                    },
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 14
                            },
                            formatter: function(params) {
                                var txt = '';
                                if (params.data.speed !== undefined) {
                                    txt = params.data.speed;
                                }
                                return txt;
                            },
                        }
                    },
                    data: convertData(item[1])
                }, {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    //波纹效果
                    rippleEffect: {
                        period: 2,
                        brushType: 'stroke',
                        scale: 3
                    },
                    label: {
                        normal: {
                            show: true,
                            color: '#fff',
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    //终点形象
                    symbol: 'circle',
                    //圆点大小
                    symbolSize: function(val) {
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            show: true
                        }
                    },
                    data: item[1].map(function(dataItem) {
                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                        };
                    })

                });

            });

            option = {
                title: {
                    text: '',
                    subtext: '',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                //线颜色及飞行轨道颜色
                visualMap: {
                    show: false,
                    min: 0,
                    max: 100,
                    color: ['#31A031','#31A031']
                },
                //地图相关设置
                geo: {
                    map: 'hunan',
                    //视角缩放比例
                    zoom: 1,
                    //显示文本样式
                    label: {
                        normal: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    //鼠标缩放和平移
                    roam: true,
                    itemStyle: {
                        normal: {
                            //              color: '#ddd',
                            borderColor: 'rgba(147, 235, 248, 1)',
                            borderWidth: 1,
                            areaColor: {
                                type: 'radial',
                                x: 0.5,
                                y: 0.5,
                                r: 0.8,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: 'rgba(   47,79,79, .2)' // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            },
                            shadowColor: 'rgba(128, 217, 248, 1)',
                            // shadowColor: 'rgba(255, 255, 255, 1)',
                            shadowOffsetX: -2,
                            shadowOffsetY: 2,
                            shadowBlur: 10
                        },
                        emphasis: {
                            areaColor: '#389BB7',
                            borderWidth: 0
                        }
                    }
                },
                series: series
            };
            myChart.setOption(option);
    }


    $('.t_btn1').click(function () {
        $('.center_text').css('display', 'none');
        $('.t_cos1').css('display', 'block');
        echart_2();
    });
    
    //获取地址栏参数
    $(function(){
        function getUrlParms(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
                if(r!=null)
                return unescape(r[2]);
                return null;
            }
            var id = getUrlParms("id");  
            if(id == 2){
                $('.center_text').css('display', 'none');
                $('.t_cos10').css('display', 'block');
                echart_10();
            }
            if(id == 3){
                $('.center_text').css('display', 'none');
                $('.t_cos11').css('display', 'block');
                echart_11();
            }
            if(id == 4){
                $('.center_text').css('display', 'none');
                $('.t_cos1').css('display', 'block');
                echart_2();
            }
            if(id == 5){
                $('.center_text').css('display', 'none');
                $('.t_cos6').css('display', 'block');
                echart_6();
            }
            if(id == 6){
                $('.center_text').css('display', 'none');
                $('.t_cos4').css('display', 'block');
                echart_1();
            }
            if(id == 7){
                $('.center_text').css('display', 'none');
                $('.t_cos8').css('display', 'block');
                echart_8();
            }
            if(id == 8){
                $('.center_text').css('display', 'none');
                $('.t_cos12').css('display', 'block');
                echart_12();
            }
            if(id == 9){
                $('.center_text').css('display', 'none');
                $('.t_cos13').css('display', 'block');
                echart_13();
            }
    });
});
