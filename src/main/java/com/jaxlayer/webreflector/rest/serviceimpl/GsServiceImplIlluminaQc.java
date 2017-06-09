package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoIlluminaQc;
import com.jaxlayer.webreflector.rest.models.IlluminaQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceIlluminaQc;
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplIlluminaQc implements GsIServiceIlluminaQc {

	
	
	@Autowired
	private GsIDaoIlluminaQc illuminaDao;
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insert(IlluminaQc t) throws Exception {
		illuminaDao.insert(t);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(IlluminaQc t) throws Exception {
		illuminaDao.update(t);
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void delete(IlluminaQc t) throws Exception {
		illuminaDao.delete(t);
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public IlluminaQc query(IlluminaQc t) throws Exception {
		return illuminaDao.query(t);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public IlluminaQc getIlluminaByProcessId(Long processesId) throws Exception {
		return illuminaDao.getIlluminaByProcessId(processesId);
	}

}
