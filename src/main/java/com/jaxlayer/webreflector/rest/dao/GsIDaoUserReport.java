package com.jaxlayer.webreflector.rest.dao;

import java.util.List;

import com.jaxlayer.webreflector.rest.models.UserReports;

public interface GsIDaoUserReport extends GsIDaoBase<UserReports> {
	public List<UserReports> getReportsByUserId(Long userId) throws Exception;
	public UserReports getReportByReportId(Long reportId) throws Exception;
	
}
