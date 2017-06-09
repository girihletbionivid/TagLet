package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoFirstProgram;
import com.jaxlayer.webreflector.rest.models.FirstProgram;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;

@Repository
public class GsIDaoImplFirstProgram implements GsIDaoFirstProgram
{
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Override
	public void insert(FirstProgram t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();
	}
	@Override
	public void update(FirstProgram t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();	
	}
	@Override
	public void delete(FirstProgram t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();	
	}
	@Override
	public FirstProgram query(FirstProgram t) throws Exception {
		return null;
	}
//	@Override
//	public FirstProgram getBactScaffoldProcessId(Long processesId) throws Exception 
//	{
//		Processes processes = serviceProcesses.getProcessesByPid(processesId);
//		Criteria criteria = sessionFactory.getCurrentSession()
//				.createCriteria(FirstProgram.class)
//				.add(Restrictions.eq("processes", processes));
//		
//		FirstProgram firstProg = (FirstProgram) criteria.uniqueResult();
////		System.out.println("*****************==>" + firstProg);
//
//		if (firstProg == null) {
//			firstProg = new FirstProgram();
//
//		}
//		return firstProg;
//	}
	
	@Override
	public FirstProgram getFirstProgramProcessId(Long processesId) throws Exception {

		Processes processes = serviceProcesses.getProcessesByPid(processesId);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(FirstProgram.class)
				.add(Restrictions.eq("processes", processes));
		
		FirstProgram firstProg = (FirstProgram) criteria.uniqueResult();
//		System.out.println("*****************==>" + firstProg);

		if (firstProg == null) {
			firstProg = new FirstProgram();

		}
		return firstProg;
	}
}
