package com.jaxlayer.webreflector.rest.service;

import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;

public interface GsIServiceFFFQc extends GsIServiceBase<FourFiveFourQc>{
	public FourFiveFourQc getFourFiveFourQcByProcessId(Long processesId) throws Exception;
}
