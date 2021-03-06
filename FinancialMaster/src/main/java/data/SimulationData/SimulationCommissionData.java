package data.SimulationData;

import java.util.ArrayList;

import DAO.DAOimpl.SimulationcommissionDaoImpl;
import DAO.dao.SimulationcommissionDao;
import DAO.pojo.Simulation;
import DAO.pojo.Simulationcommission;
import dataservice.SimulationDataService.SimulationCommissionDataService;

public class SimulationCommissionData implements SimulationCommissionDataService{
	SimulationcommissionDao SimulationcommissionDaoImpl;
	@Override
	public int persist(Simulationcommission simulationcommission) {
		SimulationcommissionDaoImpl=new SimulationcommissionDaoImpl();
		return SimulationcommissionDaoImpl.persist(simulationcommission);
	}

	@Override
	public boolean remove(int id) {
		SimulationcommissionDaoImpl=new SimulationcommissionDaoImpl();
		return SimulationcommissionDaoImpl.remove(id);
	}

	@Override
	public ArrayList<Simulationcommission> getAllSimulationcommissions() {
		// TODO Auto-generated method stub
		SimulationcommissionDaoImpl=new SimulationcommissionDaoImpl();
		ArrayList<Simulationcommission> arrayList=new ArrayList<>();
		if (SimulationcommissionDaoImpl.getAllSimualtioncommissions()!=null) {
			arrayList=(ArrayList<Simulationcommission>) SimulationcommissionDaoImpl.getAllSimualtioncommissions();
		}
		return arrayList;
	}

	@Override
	public ArrayList<Simulationcommission> getAllSimulationcommissions(String userId) {
		SimulationcommissionDaoImpl=new SimulationcommissionDaoImpl();
		ArrayList<Simulationcommission> arrayList=new ArrayList<>();
		if (SimulationcommissionDaoImpl.getAllSimualtioncommissions(userId)!=null) {
			arrayList=(ArrayList<Simulationcommission>) SimulationcommissionDaoImpl.getAllSimualtioncommissions(userId);
		}
		return arrayList;
	}

	@Override
	public Simulationcommission findById(int id) {
		// TODO Auto-generated method stub
		SimulationcommissionDaoImpl impl=new SimulationcommissionDaoImpl();
		Simulationcommission simulationcommission=impl.findById(id);
		return null;
	}

	
}
