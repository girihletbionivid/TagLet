package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoFFFQc;
import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceFFFQc;
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplFFFQc implements GsIServiceFFFQc {
 @Autowired
 private GsIDaoFFFQc daoFFFQc;
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insert(FourFiveFourQc t) throws Exception {
		daoFFFQc.insert(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(FourFiveFourQc t) throws Exception {
		daoFFFQc.update(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void delete(FourFiveFourQc t) throws Exception {
		daoFFFQc.delete(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public FourFiveFourQc query(FourFiveFourQc t) throws Exception {
		return daoFFFQc.query(t);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public FourFiveFourQc getFourFiveFourQcByProcessId(Long processesId)
			throws Exception {
		return daoFFFQc.getFourFiveFourQcByProcessId(processesId);
	}

}
