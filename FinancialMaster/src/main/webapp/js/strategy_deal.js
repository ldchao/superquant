var buytemp = [ "", "", "", "", "", "", "", "", "", "" ]; // 制定策略时的买入策略 []
var soldtemp = [ "", "", "", "", "", "", "", "", "", "" ]; // 制定策略时的卖出策略 []
var buylist = new Array(); // 表格中的所有买入策略 [][]
var soldlist = new Array(); // 表格中的所有卖出策略 [][]
var perST = new Array();
var count = 0;
var stName;
var totalcost = 0;
var tempcost = 0;
var after_mod = 0;  // 未修改为0， 经过修改为1
var buytemp_mod = [ "", "", "", "", "", "", "", "", "", "" ];  // 修改的缓存
var soldtemp_mod = [ "", "", "", "", "", "", "", "", "", "" ];

var getID = [ "stockchoose", "cost", "startdate", "enddate", "buyinst",
		"soldoutst", "otherst", "frequency" ];
var texts = [ "getprice_low", "getprice_high", "getvolume_low",
		"getvolume_high", "getturnover_low", "getturnover_high", "getpe_low",
		"getpe_high", "getpb_low", "getpb_high" ];
var comboxs = [ "price_box", "volume_box", "turnover_box", "pe_box", "pb_box" ];

var texts_2 = [ "getprice_low_2", "getprice_high_2", "getvolume_low_2",
		"getvolume_high_2", "getturnover_low_2", "getturnover_high_2",
		"getpe_low_2", "getpe_high_2", "getpb_low_2", "getpb_high_2" ];
var comboxs_2 = [ "price_box_2", "volume_box_2", "turnover_box_2", "pe_box_2",
		"pb_box_2" ];

function addStrategy() {

	var getInfo = [];

	for (var i = 0; i < getID.length; i++) {
		if (i == 4 || i == 5) {
			getInfo[i] = "查看详情";
		} else if (i == 6) {
			getInfo[i] = "敬请期待";
		} else {
			getInfo[i] = document.getElementById(getID[i]).value;
		}

		if (getInfo[i] == '') {
			alert("请制订完整策略");
			return;
		}
	}

	if (getInfo[2] > getInfo[3]) {
		alert("开始日期和结束日期是不是反啦");
		return;
	}

	if (document.getElementById("stname").innerHTML == "我的策略") {
		alert("请设定策略名和本金");
		return;
	}

	if (tempcost - getInfo[1] < 0) {
		alert("资金不够啦");
		return;
	} else {
		tempcost -= getInfo[1];
		document.getElementById("moneyleft").innerHTML = tempcost;
	}

	buylist[count] = new Array();
	soldlist[count] = new Array();
	perST[count] = new Array();
	for (var i = 0; i < 10; i++) {
		buylist[count][i] = buytemp[i];
		soldlist[count][i] = soldtemp[i];
	}

	var table = document.getElementById("strategyTable");

	var tr = table.insertRow(1);
	tr.style.height = "35px";
	tr.align = "center";
	tr.valign = "middle";

	var boxtd = document.createElement("td");
	tr.appendChild(boxtd);
	var boxdiv = document.createElement("div");
	boxtd.appendChild(boxdiv);
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	boxdiv.appendChild(checkbox);
	checkbox.onclick = function() {
		var boxs = table.getElementsByTagName("input");
		if (this.checked == false && boxs[0].checked == true) {
			boxs[0].checked = false;
		} else if (this.checked == true && boxs[0].checked == false) {
			var selectall = 1;
			for (var i = 1; i < boxs.length; i++) {
				if (boxs[i].checked == false) {
					selectall = 0;
					break;
				}
			}
			if (selectall == 1) {
				boxs[0].checked = true;
			}
		}
	}

	var tempcount = 0;
	for (var i = 0; i < getInfo.length; i++) {
		var td = document.createElement("td");
		td.innerHTML = getInfo[i];
		if (i != 4 && i != 5 && i != 6) {
			perST[count][tempcount] = getInfo[i];
			tempcount++;
		}
		if (i != 6) {
			td.style.cursor = "pointer";
		}
		td.setAttribute("onclick", "modifyST(this)");
		tr.appendChild(td);
	}

	var boxs = table.getElementsByTagName("input");
	boxs[0].checked = false;

	var rundiv = document.getElementById("add_before");
	if (rundiv.style.display != "none") {
		rundiv.style.display = "none";
		document.getElementById("add_after").style.display = "";
	}

	document.getElementById("usedmoney").innerHTML = totalcost - tempcost;

	var div_each = document.createElement("div");
	div_each.innerHTML = document.getElementById("stock_each_copy").innerHTML;
	div_each.getElementsByTagName("span")[0].innerHTML = getInfo[0];
	div_each.getElementsByTagName("span")[1].innerHTML = getInfo[1];
	document.getElementById("stocks_buyed").insertBefore(div_each,
			document.getElementById("stocks_buyed").childNodes[0]);

	zebra();
	count++;
	resetAll();

	runST();
}

function resetAll() {

	for (var i = 0; i < getID.length; i++) {
		document.getElementById(getID[i]).value = "";
	}
	buytemp = [ "", "", "", "", "", "", "", "", "", "" ];
	soldtemp = [ "", "", "", "", "", "", "", "", "", "" ];
}

function modifyST(elem_i) {
	var index = $(elem_i).parents("div").parents("#stocks_buyed").find("div")
			.index($(elem_i).parents("div"));
	
	var pos = document.getElementById("stocks_buyed").getElementsByTagName("div").length - 2 - index;

	for(var i=0; i<4; i++) {
		document.getElementById(getID[i]).value = perST[pos][i];
	}
	document.getElementById(getID[7]).value = perST[pos][4];
	
	after_mod = 1;
	buytemp_mod = buylist[pos];
	soldtemp_mod = soldlist[pos];
	
	delSingle(elem_i);
}

// 取消修改
function modifyCancel() {
	var dialogtype = [ "textfieldMod", "timepickMod", "stMod", "stMake" ];
	var modiv;
	for (var i = 0; i < dialogtype.length; i++) {
		modiv = document.getElementById(dialogtype[i]);
		if (modiv.style.display == "block") {
			modiv.style.display = "none";
		}
	}

	document.getElementById("modtext").value = "";
	document.getElementById("moddate").value = "";
}

function delSingle(elem_i) {

	var index = $(elem_i).parents("div").parents("#stocks_buyed").find("div")
			.index($(elem_i).parents("div"));

	var table = document.getElementById("strategyTable");
	var boxs = table.getElementsByTagName("input");
	boxs[index + 1].checked = true;
	deleteST();
}

// 删除
function deleteST() {
	var table = document.getElementById("strategyTable");
	var boxs = table.getElementsByTagName("input");
	var boxlen = boxs.length;
	var trs = table.getElementsByTagName("tr");

	for (var i = boxlen - 1; i > 0; i--) {
		if (boxs[i].checked == true) {
			var tds = trs[i].getElementsByTagName("td");
			tempcost += parseInt(tds[2].innerHTML);
			document.getElementById("moneyleft").innerHTML = tempcost;
			table.deleteRow(i);
			buylist.splice(boxlen - 1 - i, 1);
			soldlist.splice(boxlen - 1 - i, 1);
			perST.splice(boxlen - 1 - i, 1)
			count--;

			var buyed_div = document.getElementById("stocks_buyed");
			buyed_div.removeChild(buyed_div.getElementsByTagName("div")[i - 1]);
		}
	}

	zebra();

	var isLast = document.getElementById("stocks_buyed").getElementsByTagName(
			"div").length;
	if (isLast <= 1) {
		document.getElementById("add_before").style.display = "";
		document.getElementById("add_after").style.display = "none";
	} else {
		runST();
	}
}

// save
function saveST() {

	var buydata = new Array();
	var solddata = new Array();
	for (var i = 0; i < count; i++) {
		buydata[i] = new Array();
		solddata[i] = new Array();
		for (var j = 0; j < buylist[0].length; j++) {
			buydata[i][j] = (buylist[i][j] == "") ? 0 : buylist[i][j];
			solddata[i][j] = (soldlist[i][j] == "") ? 0 : soldlist[i][j];
		}
	}

	var per = perST.join(";")
	var buy = buydata.join(";")
	var sold = solddata.join(";")
	$.ajax({
		type : "get",
		async : false, // 同步执行
		url : "../ManageMyStrategy",
		data : {
			"stName" : stName,
			"totalcost" : totalcost,
			"perST" : per,
			"BuyList" : buy,
			"SoldList" : sold
		},
		dataType : "json",
		success : function(result) {
			if (result[0].SaveResult == "Succeed") {
				document.getElementById("savesuccess").style.display = "block";
				setTimeout(hide, "3000");
			} else if (result[0].SaveResult == "Unlogin") {
				alert("您还没登录呢")
			} else {
				alert("策略重名啦");
			}

			function hide() {
				document.getElementById("savesuccess").style.display = "none";
			}
		},
		error : function() {
			alert("策略保存失败");
		}
	})

}

function selectAll() {
	var table = document.getElementById("strategyTable");
	var boxs = table.getElementsByTagName("input");

	if (boxs[0].checked == false) {
		for (var i = 0; i < boxs.length; i++) {
			if (boxs[i].type == "checkbox")
				boxs[i].checked = false;
		}
	} else {
		for (var i = 0; i < boxs.length; i++) {
			if (boxs[i].type == "checkbox")
				boxs[i].checked = true;
		}
	}
}

// 斑马线效果
function zebra() {
	var table = document.getElementById("strategyTable");
	var tr = table.getElementsByTagName("tr");
	for (var i = 1; i < tr.length; i++) {
		if (i % 2 == 0) {
			tr[i].style.backgroundColor = "rgb(250,250,250)";
		} else {
			tr[i].style.backgroundColor = "";
		}
	}
}

// 设定本金、策略名称
function setName() {
	var stname = document.getElementById("strategyname");
	var stcost = document.getElementById("totalcost");

	if (stname.value != "" && stcost.value != "") {
		document.getElementById("stname").innerHTML = stname.value;
		document.getElementById("stcost").innerHTML = ("  本金:" + stcost.value);
		stName = stname.value;
		totalcost = stcost.value;
		tempcost = totalcost;
		document.getElementById("moneyleft").innerHTML = stcost.value;
	} else {
		alert('请输入完整信息');
	}
}

function showSTmake(field) {
	modifyCancel();
	var stdiv = document.getElementById("stMake");
	if (stdiv.style.display == "none") {
		stdiv.style.display = "block";
	}
	stdiv.style.position = "absolute";
	stdiv.style.top = (field.offsetTop + 421) + "px";
	stdiv.style.marginLeft = field.getBoundingClientRect().left + "px";

	for (var i = 0; i < comboxs.length; i++) {
		var combox = document.getElementById(comboxs[i]);
		combox.setAttribute("onclick", "setLimit(" + i + ")")
	}

	// 点击制订后，向temp中存数据
	document.getElementById("stmake_btn").onclick = function() {
		if (field.id == "buyinst") {
			for (var i = 0; i < texts.length; i++) {
				buytemp[i] = document.getElementById(texts[i]).value;
			}
		} else {
			for (var i = 0; i < texts.length; i++) {
				soldtemp[i] = document.getElementById(texts[i]).value;
			}
		}

		modifyCancel();
	}

	if(after_mod == 1) {
		buytemp = buytemp_mod;
		soldtemp = soldtemp_mod;
		
		after_mod = 0;
	}
	
	// 制定策略的点开界面
	if (field.id == "buyinst") {
		for (var i = 0; i < texts.length; i++) {
			document.getElementById(texts[i]).value = buytemp[i];
		}

		for (var i = 0; i < comboxs.length; i++) {
			if (buytemp[2 * i] == "" && buytemp[2 * i + 1] == "") {
				document.getElementById(texts[2 * i]).readOnly = true;
				document.getElementById(texts[2 * i + 1]).readOnly = true;
				document.getElementById(comboxs[i]).checked = false;
			} else {
				document.getElementById(texts[2 * i]).readOnly = false;
				document.getElementById(texts[2 * i + 1]).readOnly = false;
				document.getElementById(comboxs[i]).checked = true;
			}
		}

	} else {
		for (var i = 0; i < texts.length; i++) {
			document.getElementById(texts[i]).value = soldtemp[i];
		}

		for (var i = 0; i < comboxs.length; i++) {
			if (soldtemp[2 * i] == "" && soldtemp[2 * i + 1] == "") {
				document.getElementById(texts[2 * i]).readOnly = true;
				document.getElementById(texts[2 * i + 1]).readOnly = true;
				document.getElementById(comboxs[i]).checked = false;
			} else {
				document.getElementById(texts[2 * i]).readOnly = false;
				document.getElementById(texts[2 * i + 1]).readOnly = false;
				document.getElementById(comboxs[i]).checked = true;
			}
		}
	}
}

// 制定策略块
function setLimit(pos) {

	var combox = document.getElementById(comboxs[pos]);

	pos = pos * 2;

	if (combox.checked == true) {
		document.getElementById(texts[pos]).readOnly = false;
		document.getElementById(texts[pos + 1]).readOnly = false;
	} else {
		document.getElementById(texts[pos]).value = "";
		document.getElementById(texts[pos + 1]).value = "";
		document.getElementById(texts[pos]).readOnly = true;
		document.getElementById(texts[pos + 1]).readOnly = true;
	}
}

// 修改策略块
function setLimit_2(pos) {

	var combox = document.getElementById(comboxs_2[pos]);

	pos = pos * 2;

	if (combox.checked == true) {
		document.getElementById(texts_2[pos]).readOnly = false;
		document.getElementById(texts_2[pos + 1]).readOnly = false;
	} else {
		document.getElementById(texts_2[pos]).value = "";
		document.getElementById(texts_2[pos + 1]).value = "";
		document.getElementById(texts_2[pos]).readOnly = true;
		document.getElementById(texts_2[pos + 1]).readOnly = true;
	}
}

function runST() {

	var buydata = new Array();
	var solddata = new Array();
	for (var i = 0; i < count; i++) {
		buydata[i] = new Array();
		solddata[i] = new Array();
		for (var j = 0; j < buylist[0].length; j++) {
			buydata[i][j] = (buylist[i][j] == "") ? 0 : buylist[i][j];
			solddata[i][j] = (soldlist[i][j] == "") ? 0 : soldlist[i][j];
		}
	}

	var per = perST.join(";")
	var buy = buydata.join(";")
	var sold = solddata.join(";")
	$.ajax({
		type : "post",
		async : false, // 同步执行
		url : "../RunStrategy",
		data : {
			"stName" : stName,
			"totalcost" : totalcost,
			"perST" : per,
			"BuyList" : buy,
			"SoldList" : sold
		},
		dataType : "json",
		success : function() {
			var div = document.getElementById("strategyLineChart");
			if (div.style.display == "none") {
				div.style.display = "block";
			}
			getLinechart("../RunStrategy");
		},
		error : function() {
			alert("策略模拟失败");
		}
	})
}