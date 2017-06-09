package com.jaxlayer.webreflector.rest.service;

import java.util.List;

import com.jaxlayer.webreflector.rest.models.UserReports;

public interface GsIServiceUserReport extends GsIServiceBase<UserReports> {
	public List<UserReports> getReportsByUserId(Long userId) throws Exception;
	public UserReports getReportByReportId(Long reportId) throws Exception;
}
