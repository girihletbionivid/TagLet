package com.jaxlayer.webreflector.rest.dao;

import com.jaxlayer.webreflector.rest.models.IlluminaQc;

public interface GsIDaoIlluminaQc extends GsIDaoBase<IlluminaQc>{
	public IlluminaQc getIlluminaByProcessId(Long processesId) throws Exception;
}
