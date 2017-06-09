package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoFFFQc;
import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
@Repository
public class GsDaoImplFFFQc implements GsIDaoFFFQc {
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private SessionFactory sessionFactory;
	@Override
	public void insert(FourFiveFourQc t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void update(FourFiveFourQc t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void delete(FourFiveFourQc t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();

		
	}

	@Override
	public FourFiveFourQc query(FourFiveFourQc t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FourFiveFourQc getFourFiveFourQcByProcessId(Long processesId)
			throws Exception {
		Processes processes
		=serviceProcesses.getProcessesByPid(processesId);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(FourFiveFourQc.class)
				.add(Restrictions.eq("processes", processes));
		FourFiveFourQc illuminaQc = (FourFiveFourQc) criteria.uniqueResult();
		System.out.println("*****************==>" + illuminaQc);
		if (illuminaQc == null) {
			illuminaQc = new FourFiveFourQc();

		}
		return illuminaQc;
	}

}
