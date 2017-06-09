package com.jaxlayer.webreflector.rest.service;

import com.jaxlayer.webreflector.rest.models.IlluminaQc;

public interface GsIServiceIlluminaQc extends GsIServiceBase<IlluminaQc> {
	public IlluminaQc getIlluminaByProcessId(Long processesId) throws Exception;
}
