import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import Echarts from 'native-echarts';

export default class CommissionEcharts extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let legendTitle = [];
        let commissionAmountList = [];
        this.props.commissionList.map(item => {
            legendTitle.push(item.commissionTypeName);
            commissionAmountList.push(item.commissionAmount);
        });
        let data = {
            id: 'echartPie',
            value: commissionAmountList,
            legend: legendTitle,
            color: ['#d64346', '#f68b1e', '#b2d34f', '#4978cf','#61a0a8','#0170bc','#e2b342','#f915a6','#67aa8b','#328760  ','#91c7ae','#ff881e','#c23531','#2f4554'],
            title: '佣金分类汇总图'
        };

        let seriesData = [];
        data.value.forEach(function(item, index) {
            seriesData.push({
                value: item,
                name: data.legend[index]
            })
        });

        const option = {
            backgroundColor: '#fff',
            title: {
                x: '2%',
                y: '2%',
                textStyle: {
                    fontWeight: 400,
                    fontSize: 16,
                    color: '#687284'
                },
                text: data.title || ''
            },
            legend: {
                orient: 'horizontal',
                bottom: 16,
                selectedMode: false,
                itemWidth: 30,
                itemHeight: 14,
                itemGap: 6,
                borderRadius: 6,
                data: data.legend
            },
            series: [{
                type: 'pie',
                hoverAnimation: data.hoverAnimation === false ? false : true,
                radius: ['40%', '67%'],
                color: data.color,
                label: {
                    normal: {
                        position: 'inner',
                        formatter: function(param) {
                            if (!param.percent) return ''
                            var f = Math.round(param.percent * 10) / 10;
                            var s = f.toString();
                            var rs = s.indexOf('.');
                            if (rs < 0) {
                                rs = s.length;
                                s += '.';
                            }
                            while (s.length <= rs + 1) {
                                s += '0';
                            }
                            return s + '%';
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 12
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: seriesData
            }]
        };

        return(
            <View>
                <Echarts option={option} height={400} />
            </View>
        )
    }
}