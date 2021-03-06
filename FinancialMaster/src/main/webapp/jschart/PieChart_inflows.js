/**
 *  个股分析中资金流向饼状图
 */

var PieChart_inflows = echarts.init(document.getElementById('pieChart_inflows'));
var inflows=[];

$.ajax({
	type : "post",
	async : false, //同步执行
	url : '../GetStockInflowPieChart',
	dataType : "json", //返回数据形式为json
	success : function(result) {
		if (result) {
			for (var i = 0; i < result.length; i++) {
				inflows.push(result[i].inflow);
			}
		}
	},
	error : function(errorMsg) {
		alert("不好意思，资金流向饼状图请求数据失败啦!");
		myChart.hideLoading();
	}
})

option = {
    
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
//    legend: [{
//        orient: 'vertical',
//        x: 'left',
//        y:'10%',
//        data:['特大单买入','大单买入','中单买入','小单买入']
//    },{
//        orient: 'vertical',
//        x: 'right',
//        y:  '80%',
//        data:['特大单卖出','大单卖出','中单卖出','小单卖出']
//    }],
    series: [
        {
            name:'买入',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '50%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:inflows[0][0], name:'特大单买入',selected:'true'},
                {value:inflows[0][1], name:'大单买入'},
                {value:inflows[0][2], name:'中单买入'},
                {value:inflows[0][3], name:'小单买入'}
            ]
        },
        {
            name:'卖出',
            type:'pie',
            radius: ['65%', '92%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            data:[
                {value:inflows[0][4], name:'特大单卖出'},
                {value:inflows[0][5], name:'大单卖出'},
                {value:inflows[0][6], name:'中单卖出'},
                {value:inflows[0][7], name:'小单卖出'}
            ]
        }
    ]
};

PieChart_inflows.setOption(option);