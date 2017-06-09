package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoIonTorrent;
import com.jaxlayer.webreflector.rest.models.IonTorrent;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;

@Repository
public class GsDaoImplIonTorrent implements GsIDaoIonTorrent {
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void insert(IonTorrent t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void update(IonTorrent t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void delete(IonTorrent t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public IonTorrent query(IonTorrent t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IonTorrent getIonTorrentByProcessId(Long processesId)
			throws Exception {
		Processes processes = serviceProcesses.getProcessesByPid(processesId);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(IonTorrent.class)
				.add(Restrictions.eq("processes", processes));
		IonTorrent illuminaQc = (IonTorrent) criteria.uniqueResult();
		System.out.println("*****************==>" + illuminaQc);
		if (illuminaQc == null) {
			illuminaQc = new IonTorrent();

		}
		return illuminaQc;
	}

}
