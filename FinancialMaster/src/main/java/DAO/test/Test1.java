package DAO.test;


import java.sql.Timestamp;
import java.text.Normalizer.Form;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import DAO.DAOimpl.BenchdataAccurateDaoImpl;
import DAO.DAOimpl.SimulationDaoImpl;
import DAO.DAOimpl.SimulationProfitDaoImpl;
import DAO.DAOimpl.SimulationcommissionDaoImpl;
import DAO.connection.DBconnection;
import DAO.pojo.Bench;
import DAO.pojo.BenchdataAccurate;
import DAO.pojo.Simulation;
import DAO.pojo.SimulationProfit;
import PO.recommendedStock.ContinuingQuantityPO;
import PO.recommendedStock.ContinuingTrendPO;
import PO.recommendedStock.PeakPO;
import PO.recommendedStock.PricePO;
import PO.recommendedStock.breakthroughPO;
import data.BenchData.BenchdataAccurateUpdate;
import data.SimulationData.SimulationData;
import data.StockData.TradeRecordAccurateUpdate;
import data.StockData.RecommendedData.ContinuingQuantityDown;
import data.StockData.RecommendedData.ContinuingTrendDown;
import data.StockData.RecommendedData.ContinuingTrendUp;
import data.StockData.RecommendedData.PeakDown;
import data.StockData.RecommendedData.PeakUp;
import data.StockData.RecommendedData.PriceDown;
import data.StockData.RecommendedData.PriceUp;
import data.StockData.RecommendedData.breakthroughDown;
import javassist.expr.NewArray;


public class Test1 {

	public static void main(String[] args) {
		
		
		
		DBconnection dBconnection=new DBconnection();
//		try {
//			String hql="delete from BenchdataAccurate where 1=1";
//			Session session=dBconnection.getSession();
//			Transaction transaction=session.beginTransaction();
//			session.createQuery(hql).executeUpdate();
//			transaction.commit();
//			session.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		
//		try {
//			SimulationProfitDaoImpl simulationProfitDaoImpl=new SimulationProfitDaoImpl();
//			SimulationProfit simulationProfit=new SimulationProfit();
//			simulationProfit.setOperation("121");
//			simulationProfit.setProfit(0);
//			simulationProfit.setStockId("222");
//			simulationProfit.setUserId("333");
//			simulationProfit.setDate(Calendar.getInstance().getTime());
//			System.out.println(simulationProfitDaoImpl.persist(simulationProfit));
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
//		try {
//			SimulationProfitDaoImpl impl=new SimulationProfitDaoImpl();
//			System.out.println(impl.getAllSimulationProfits("123").size());
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
//		try {
//			BenchdataAccurateDaoImpl benchdataAccurateDaoImpl=new BenchdataAccurateDaoImpl();
//			List list=benchdataAccurateDaoImpl.getBenchdataAccurate();
//			for (Object object : list) {
//				BenchdataAccurate po=(BenchdataAccurate) object;
//				System.out.println(po.getId().getBenchId());
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
//		try {
//			Document document=Jsoup.connect("http://www.shdjt.com/sh.htm").get();
//			Elements elements=document.select("tr[height=25]");
//			for (Element element : elements) {
//				System.out.println(element.text());
//			}
//
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
		
//		BenchdataAccurateUpdate accurateUpdate=new BenchdataAccurateUpdate();
//		BenchdataAccurateDaoImpl benchdataAccurateDaoImpl=new BenchdataAccurateDaoImpl();
//		System.out.println(benchdataAccurateDaoImpl.getBenchdataAccurate("123"));;
		
		TradeRecordAccurateUpdate tradeRecordAccurateUpdate=new TradeRecordAccurateUpdate();
//		Date date=Calendar.getInstance().getTime();
//		SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//		String string=simpleDateFormat.format(date);
//		System.out.print(Timestamp.valueOf(string));
	}

}
