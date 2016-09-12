package web.blservice.simulationInfo;

import java.util.ArrayList;

import ENUM.ManageState;
import VO.SimulationStockVO;

public interface SimulationStockInfo {

	
	//����һ���ֲֹ�Ʊ
	public ManageState buyStock(SimulationStockVO simulationStockVO); 
	
	//����һ�����й�Ʊ��ӯ�����  
	public double getResult(String id);	
	
	//����һ�����й�Ʊ��
	public String[][] getResuleDetail(String id);
	
	//����һ���ֲֹ�Ʊ
	public ManageState sellStock(String id);
	
	//�õ����гֲֹ�Ʊ
	public ArrayList<SimulationStockVO> getStockList(String userID);
}