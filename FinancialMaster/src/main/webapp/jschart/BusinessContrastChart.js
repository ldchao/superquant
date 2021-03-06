/**
 * 行业对比图
 */
var businessContrastChart= echarts
		.init(document.getElementById('businessContrastChart'));

var dates = [];
var rise_falls = [];
var business_rise_falls = [];

$.ajax({
	type : "post",
	async : false, //同步执行
	url : '../GetBusinessContrast',
	dataType : "json", //返回数据形式为json
	success : function(result) {
		if (result) {
			for (var i = 0; i < result.length; i++) {
				dates.push(result[i].date);
				rise_falls.push(result[i].rise_fall);
				business_rise_falls.push(result[i].business_rise_fall);
			}
		}
	},
	error : function(errorMsg) {
		alert("不好意思，行业对比图请求数据失败啦!");
		myChart.hideLoading();
	}
})

option = {
    title: {
        text: '行业涨跌率对比图',
        x: '5%',
        y:  '0',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['所属行业','该股'],
        left:'right'
    },
    grid: {
    	top:  '15%',
        left: '3%',
        right: '4%',
        bottom: '12%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
    },
    yAxis: {
        type: 'value',
        scale : true,
    },
        dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '90%',
            start: 0,
            end: 100
        }
    ],
    series: [
        {
            name:'所属行业',
            type:'line',
            data:business_rise_falls
        },
        {
            name:'该股',
            type:'line',
            data:rise_falls
        }
    ]
};

businessContrastChart.setOption(option);