package com.jaxlayer.webreflector.rest.service;

import com.jaxlayer.webreflector.rest.models.FirstProgram;

public interface GsIServiceFirstProgram extends GsIServiceBase<FirstProgram>
{
	public FirstProgram getFirstProgramByProcessId(Long processesId) throws Exception;
}
