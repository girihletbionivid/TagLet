package com.jaxlayer.webreflector.rest.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoUserReport;
import com.jaxlayer.webreflector.rest.models.UserReports;
import com.jaxlayer.webreflector.rest.service.GsIServiceUserReport;

@Service
@Transactional(propagation=Propagation.REQUIRED)
public class GsServiceImplUserReport implements GsIServiceUserReport{
	@Autowired
	private GsIDaoUserReport daoUserReport;
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void insert(UserReports t) throws Exception {
		daoUserReport.insert(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void update(UserReports t) throws Exception {
		daoUserReport.update(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(UserReports t) throws Exception {
		daoUserReport.delete(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public UserReports query(UserReports t) throws Exception {
		return daoUserReport.query(t);
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public List<UserReports> getReportsByUserId(Long userId) throws Exception {
		return daoUserReport.getReportsByUserId(userId);
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public UserReports getReportByReportId(Long reportId) throws Exception {
		return daoUserReport.getReportByReportId(reportId);
	}

}
