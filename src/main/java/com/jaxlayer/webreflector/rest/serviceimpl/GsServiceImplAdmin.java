package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoAdmin;
import com.jaxlayer.webreflector.rest.models.Admin;
import com.jaxlayer.webreflector.rest.service.GsIServiceAdmin;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplAdmin implements GsIServiceAdmin {
	@Autowired
	private GsIDaoAdmin userAdmin;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insert(Admin t) throws Exception {
		userAdmin.insert(t);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(Admin t) throws Exception {
		userAdmin.update(t);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void delete(Admin t) throws Exception {
		userAdmin.delete(t);

	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Admin query(Admin t) throws Exception {
		return userAdmin.query(t);
	}

}
