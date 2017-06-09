package com.jaxlayer.webreflector.rest.daoimpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoProcesses;
import com.jaxlayer.webreflector.rest.models.FirstProgram;
import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;
import com.jaxlayer.webreflector.rest.models.IlluminaQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;

@Repository
public class GsDaoImplProcesses implements GsIDaoProcesses {
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void insert(Processes t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void update(Processes t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void delete(Processes t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public Processes query(Processes t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Processes getProcessesByPid(Long pid) throws Exception {
		Processes processes = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("PID", pid));

		processes = (Processes) criteria.uniqueResult();
		if (processes == null) {
			processes = new Processes();
			processes.setProcessId(-1l);

		}
		return processes;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Processes> getListOfProcessesByUserId(Long userId)
			throws Exception {
		List<Processes> listOfProcess = new ArrayList<Processes>();
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("user.userId", userId))
				.addOrder(Order.desc("processStartTime"));
		listOfProcess = criteria.list();
		return listOfProcess;
	}

	@Override
	public Processes getProcessesByProcessesid(Long processesId)
			throws Exception {
		Processes processes = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("processId", processesId));

		processes = (Processes) criteria.uniqueResult();
		if (processes == null) 
		{
			throw new Exception("process not found for Id = " + processesId+"..!");
		}
		return processes;
	}

	@Override
	public ProcessesCommanInterface getFirstProgramProcessCommanByProcessesId(Long processesId) throws Exception 
	{
		ProcessesCommanInterface processesCommanInterface = null;
		Criteria criteria1 = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("processId", processesId));
		Processes processes = (Processes) criteria1.uniqueResult();
		
		Criteria criteria = sessionFactory
				.getCurrentSession()
				.createCriteria(FirstProgram.class)
				.add(Restrictions.eq("tagLetProcessId", processes.getProcessesTypeId()));
		
		processesCommanInterface = (FirstProgram) criteria.uniqueResult();
		
		System.out.println(processesCommanInterface.toString());
		
		return processesCommanInterface;
	}
	public ProcessesCommanInterface getProcessCommanByProcessesId(
			Long processesId, String processType) throws Exception {

		ProcessesCommanInterface processesCommanInterface = null;

		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(IlluminaQc.class)
				.add(Restrictions.eq("processes.processId", processesId));

		processesCommanInterface = (IlluminaQc) criteria.uniqueResult();
		System.out.println(processesId
				+ "my====================illumna==omom==>"
				+ processesCommanInterface.toString());

		return processesCommanInterface;

	}

	@Override
	public ProcessesCommanInterface getIlluminaQcProcessCommanByProcessesId(
			Long processesId) throws Exception {
		ProcessesCommanInterface processesCommanInterface = null;
		Criteria criteria1 = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("processId", processesId));
		Processes processes = (Processes) criteria1.uniqueResult();
		Criteria criteria = sessionFactory
				.getCurrentSession()
				.createCriteria(IlluminaQc.class)
				.add(Restrictions.eq("illuminaQcId",
						processes.getProcessesTypeId()));

		processesCommanInterface = (IlluminaQc) criteria.uniqueResult();
		System.out.println(processesId
				+ "my====================illumna==omom==>"
				+ processesCommanInterface.toString());
		return processesCommanInterface;
	}
	@Override
	public ProcessesCommanInterface getFourFiveFourProcessCommanByProcessesId(
			Long processesId) throws Exception {
		Criteria criteria1 = sessionFactory.getCurrentSession()
				.createCriteria(Processes.class)
				.add(Restrictions.eq("processId", processesId));
		Processes processes = (Processes) criteria1.uniqueResult();
		ProcessesCommanInterface processesCommanInterface = null;

		Criteria criteria = sessionFactory
				.getCurrentSession()
				.createCriteria(FourFiveFourQc.class)
				.add(Restrictions.eq("fourFiveFourQcId",
						processes.getProcessesTypeId()));

		processesCommanInterface = (FourFiveFourQc) criteria.uniqueResult();
		System.out.println(processesId
				+ "my====================Fourfivefour==omom==>"
				+ processesCommanInterface.toString());
		return processesCommanInterface;
	}
}
