<%@page import="VO.BusinessItemVO"%>
<%@page import="DAO.pojo.Industries"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="VO.BusinessVO"%>
<%@page import="PO.industriesPO"%>
<%@page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SuperQuant--您的第一手证券信息</title>

<!-- Bootstrap Core CSS -->
<link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css">

<!-- Custom CSS -->
<link href="../css/agency.css" rel="stylesheet" type="text/css">

<!-- Custom Fonts -->
<link href="../css/font-awesome.min.css" rel="stylesheet"
	type="text/css">

<link href="../css/headNav.css" rel="stylesheet" type="text/css">
<link href="../css/structure.css" rel="stylesheet" type="text/css">
<script src="../js/jquery.min.js"></script>
<script src="../js/echarts.min.js"></script>

<style>
li {
	list-style-type: none;
}
</style>

</head>

<body id="page-top" class="index">

	<nav class="navbar navbar-default navbar-fixed-top"
		style="background-color: #4A433B;">

	<div class="container">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header page-scroll">
			<button type="button" class="navbar-toggle" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<!--  <a class="navbar-brand page-scroll" href="#page-top">Super Quant</a>  -->
			<img src="../webImage/logo.png" title="返回顶部" id="logo">
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1" style="height: 216px;">
			<ul class="nav navbar-nav navbar-left">
				<li class="hidden"><a href="#page-top"></a></li>

				<li><a class="page-scroll" href="HomePage.jsp">首页</a></li>
				<li><a class="page-scroll" href="../ToMarketPageServlet">大盘</a></li>
				<li><a class="page-scroll" href="../ToStockPageServlet">个股</a></li>
				<li><a class="page-scroll a-active"
					href="../ToBusinessPageServlet">行业</a></li>
				<li><a class="page-scroll" href="StrategyPage.jsp">策略</a></li>
			</ul>
		</div>

		<div class="style_5 hidden-sm hidden-xs">
			<fieldset id="searchform">
				<input id="searchfield" type="text" placeholder="搜索"
					class="text_input" onblur="this.placeholder='搜索';"
					onfocus="this.placeholder='输入股票代码搜索';"
					onmouseover="this.placeholder='输入股票代码搜索';"
					onmouseout="this.placeholder='搜索';" onkeyup="showHint(this.value)" />
				<input name="submit" type="submit" value='' />
			</fieldset>

			<div id="searchHint"
				style="position: absolute; background-color: rgb(235, 235, 235); width: 150px; margin-left: 945px; margin-top: -20px;">
			</div>
		</div>

		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid --> </nav>

	<div class="compare" style="height: 450px;">
		<%
			BusinessVO businessVO = (BusinessVO) session.getAttribute("BusinessDetail");
			industriesPO update_message = businessVO.getUptodate_message();
			ArrayList<Industries> historyData = businessVO.getHistoryData();
			ArrayList<BusinessItemVO> businessItemVOs = businessVO.getBusinessItemVOs();
		%>
		<h3 class="title" style="margin-top: 140px;"><%=update_message.getIndustry()%></h3>
		<%-- <div class="headdiv">
		<span class="headlbl"><%=update_message.getStockName()%>〔<%=update_message.getStockId()%>〕</span>

		<span id="now"><%=update_message.getNow()%></span> <span id="rise_fall"><%=update_message.getRise_fall()%></span>

		<img title="关注该股" id="heartdiv" onclick="changePic()"
			src="../webImage/heart.png">

		<hr class="hrstyle" />

		<span class="fontlbl">换手率</span> <span class="fontcontent"><%=uptodateStock.getTurnover()%></span>
		<span class="fontlbl" style="left: 110px">量比</span> <span
			class="fontcontent" style="left: 110px"><%=update_message.getQuantity_relative_ratio()%></span>
		<span class="fontlbl" style="left: 200px">主动率</span> <span
			class="fontcontent" style="left: 200px"><%=update_message.getPositive()%></span>
		<span class="fontlbl" style="left: 305px">通吃率</span> <span
			class="fontcontent" style="left: 305px"><%=update_message.getTongchilv()%></span>
		<span class="fontlbl" style="left: 405px">行业</span> <span
			class="fontcontent" style="left: 405px; font-size: 15px;"><%=update_message.getIndustry()%></span>

	</div> --%>
		<div id="business_history_chart"
			style="width: 100%; height: 400px; margin-left: auto; margin-right: auto; pading-bottom: 0;"></div>

		<h3 class="title" style="margin-top: 140px;">业内公司情况</h3>
		<table id="senfe">
			<thead>
				<tr align="center" valign="middle" height="50">
					<th width="160" bgcolor="#ccc">股票代号</th>
					<th width="180" bgcolor="#ccc">股票名称</th>
					<th width="280" bgcolor="#ccc">股票所属行业</th>
					<th width="140" bgcolor="#ccc">最新价</th>
					<th width="140" bgcolor="#ccc">涨跌额</th>
					<th width="140" bgcolor="#ccc">涨跌幅</th>
					<th width="160" bgcolor="#ccc">昨日收盘</th>
					<th width="140" bgcolor="#ccc">开盘价</th>
					<th width="140" bgcolor="#ccc">最高价</th>
					<th width="140" bgcolor="#ccc">最低价</th>
					<th width="180" bgcolor="#ccc">净流入(万)</th>
					<th width="140" bgcolor="#ccc">成交量</th>
					<th width="140" bgcolor="#ccc">成交额</th>
					<th width="140" bgcolor="#ccc">换手率</th>
				</tr>
			</thead>

			<tbody id="group_one">

				<%
					int i = 0;
					for (BusinessItemVO itemVO : businessItemVOs) {
				%>

				<tr align="center" valign="middle" height="40"
					onmouseover="mouseIn(<%=i + 1%>);"
					onmouseout="mouseOut(<%=i + 1%>);"
					onclick="mouseClick(<%=i + 1%>,'../ToStockDetailPageServlet')">

					<td><%=itemVO.getStockId()%></td>
					<td><%=itemVO.getStockName()%></td>
					<td><%=itemVO.getStockBusiness()%></td>
					<td><%=itemVO.getCurrent_price()%></td>
					<td><%=itemVO.getRise_fall_price()%></td>
					<td><%=itemVO.getRise_fall_percent()%></td>
					<td><%=itemVO.getYesterday_close()%></td>
					<td><%=itemVO.getOpen()%></td>
					<td><%=itemVO.getHigh()%></td>
					<td><%=itemVO.getLow()%></td>
					<td><%=itemVO.getInflows()%></td>
					<td><%=itemVO.getVolume()%></td>
					<td><%=itemVO.getPrice()%></td>
					<td><%=itemVO.getTurnover()%></td>
				</tr>
				<%
					i++;
					}
				%>
			</tbody>
		</table>
		<h3 class="title" style="margin-top: 140px;">行业历史数据</h3>
	</div>




	<!-- Plugin JavaScript -->

	<script src="../js/classie.js"></script>
	<script src="../js/cbpAnimatedHeader.js"></script>
	<script src="../js/table_pages.js"></script>
	<script src="../jschart/businessBarChart.js"></script>
	<script src="../js/jquery.js"></script>
	<script type="text/javascript" src="../js/searchHint.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	<script src="../jschart/businessHistoryChart.js"></script>
</body>
</html>