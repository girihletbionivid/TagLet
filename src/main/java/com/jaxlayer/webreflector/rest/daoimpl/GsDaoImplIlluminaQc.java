package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoIlluminaQc;
import com.jaxlayer.webreflector.rest.models.IlluminaQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;

@Repository
public class GsDaoImplIlluminaQc implements GsIDaoIlluminaQc {
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void insert(IlluminaQc t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();
	}

	@Override
	public void update(IlluminaQc t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void delete(IlluminaQc t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public IlluminaQc query(IlluminaQc t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IlluminaQc getIlluminaByProcessId(Long processesId) throws Exception {
		Processes processes
		=serviceProcesses.getProcessesByPid(processesId);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(IlluminaQc.class)
				.add(Restrictions.eq("processes", processes));
		IlluminaQc illuminaQc = (IlluminaQc) criteria.uniqueResult();
		System.out.println("*****************==>" + illuminaQc);
		if (illuminaQc == null) {
			illuminaQc = new IlluminaQc();

		}
		return illuminaQc;
	}

}
