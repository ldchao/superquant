package dataservice.StockDataService;

import java.util.ArrayList;

import DAO.pojo.TradeRecordAccurate;

public interface StockDataAccurateService {
	public ArrayList<TradeRecordAccurate> geTradeRecordAccurates();
	
	//delete all the record
	public boolean clean();
}