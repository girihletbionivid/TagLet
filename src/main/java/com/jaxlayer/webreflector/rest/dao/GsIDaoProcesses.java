package com.jaxlayer.webreflector.rest.dao;

import java.util.List;

import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;

public interface GsIDaoProcesses extends GsIDaoBase<Processes> {
	public Processes getProcessesByPid(Long pid) throws Exception;
	public Processes getProcessesByProcessesid(Long processesId) throws Exception;
	public List<Processes> getListOfProcessesByUserId(Long userId) throws Exception;
	
	public ProcessesCommanInterface getFirstProgramProcessCommanByProcessesId(Long processesId) throws Exception;
	public ProcessesCommanInterface getIlluminaQcProcessCommanByProcessesId( Long processesId) throws Exception;
	public ProcessesCommanInterface getFourFiveFourProcessCommanByProcessesId(Long processesId) throws Exception;
}
