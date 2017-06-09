package com.jaxlayer.webreflector.rest.dao;

import com.jaxlayer.webreflector.rest.models.FirstProgram;

public interface GsIDaoFirstProgram  extends GsIDaoBase<FirstProgram> 
{
	public FirstProgram getFirstProgramProcessId(Long processesId) throws Exception;
}
