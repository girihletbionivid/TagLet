package com.jaxlayer.webreflector.rest.dao;

import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;

public interface GsIDaoFFFQc extends GsIDaoBase<FourFiveFourQc>{
	public FourFiveFourQc getFourFiveFourQcByProcessId(Long processesId) throws Exception;
}
