package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoAdmin;
import com.jaxlayer.webreflector.rest.models.Admin;
@Repository
public class GsDaoImplAdmin implements GsIDaoAdmin{
	@Autowired
	private SessionFactory sessionFactory;
	@Override
	public void insert(Admin t) throws Exception {

		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();
		
	}

	@Override
	public void update(Admin t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();
		
	}

	@Override
	public void delete(Admin t) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Admin query(Admin t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
