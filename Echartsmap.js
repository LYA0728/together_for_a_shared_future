var dom = document.getElementById('mapPlotContainer');
        var myChart = echarts.init(dom, null, {
            renderer: 'svg',
            useDirtyRect: false
        });
        var app = {};

        const mycolorMap = {
            "极紧急":"rgb(165,0,38)",
            "较急":"rgb(215,48,39)",
            // "紧急":"rgb(214, 96, 77)"
            "紧急":"rgb(244,165,30)"
        }

        var option;

        
        // console.log(data)
        
        option = {
            color:['rgb(238, 102, 102)', 'green', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            title: {
                
                text: '1717条在线求助的在线分布',
                subtext: 'data from https://daohouer.com',
                sublink: 'https://daohouer.com',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params,ticket,callback){
                    console.log(params)
                    locationTxt = String(params["data"]["location"])
                    level = String(params["data"]['level'])
                    Type = String(params["data"]['type'])
                    abstract = String(params["data"]['abstract'])
                    // console.log(abc)
                    return `<span>地址：${locationTxt} 
                    <br> 紧急程度：${level} 
                    <br> 分类：${Type}
                    <br> 摘要: ${abstract}
                    
                    </span>`
                }
            },
            bmap: {
                center: [121.85, 31.22],
                zoom: 12,
                roam: true,
                mapStyle: {
                    styleJson: [
                        {
                            featureType: 'water',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                                // color:"#00000000"
                            }
                        },
                        {
                            featureType: 'land',
                            elementType: 'all',
                            stylers: {
                                color: '#f3f3f3'
                            }
                        },
                        {
                            featureType: 'railway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'highway',
                            elementType: 'all',
                            stylers: {
                                color: '#fdfdfd'
                            }
                        },
                        {
                            featureType: 'highway',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry',
                            stylers: {
                                color: '#fefefe'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'geometry.fill',
                            stylers: {
                                color: '#fefefe'
                            }
                        },
                        {
                            featureType: 'poi',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'green',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'subway',
                            elementType: 'all',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'manmade',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'local',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'arterial',
                            elementType: 'labels',
                            stylers: {
                                visibility: 'off'
                            }
                        },
                        {
                            featureType: 'boundary',
                            elementType: 'all',
                            stylers: {
                                color: '#fefefe'
                            }
                        },
                        {
                            featureType: 'building',
                            elementType: 'all',
                            stylers: {
                                color: '#d1d1d1'
                            }
                        },
                        {
                            featureType: 'label',
                            elementType: 'labels.text.fill',
                            stylers: {
                                /* */
                                color: '#000000',
                                //back:'red'
                            }
                        }
                    ]
                }
            },
            series: [
                {
                    name: '求助地址',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: geoData,
                    symbolSize: function (val) {
                        return  5;
                    },
                    color:"#ee6666",
                    itemStyle:{
                        normal:{
                            color:function(d){
                                // console.log(mycolorMap[d["data"]["level"]])
                                return mycolorMap[d["data"]["level"]]
                            }
                        }
                    },
                    
                    encode: {
                        value: 2
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    }
                },
                // {
                //     name: 'Top 5',
                //     type: 'effectScatter',
                //     coordinateSystem: 'bmap',
                //     data: data.slice(0, 6),
                //     symbolSize: function (val) {
                //         return 10+5;
                //     },
                //     encode: {
                //         value: 2
                //     },
                //     showEffectOn: 'render',
                //     rippleEffect: {
                //         brushType: 'stroke'
                //     },
                //     label: {
                //         formatter: '{b}',
                //         position: 'right',
                //         show: true
                //     },
                //     itemStyle: {
                //         shadowBlur: 10,
                //         shadowColor: '#333'
                //     },
                //     emphasis: {
                //         scale: true
                //     },
                //     zlevel: 1
                // }
            ],
            // visualMap:{

            // }
        };

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);