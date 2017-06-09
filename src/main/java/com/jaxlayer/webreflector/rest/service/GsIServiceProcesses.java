package com.jaxlayer.webreflector.rest.service;

import java.util.List;

import com.jaxlayer.webreflector.rest.models.Processes;

public interface GsIServiceProcesses extends GsIServiceBase<Processes>
{
    public Processes getProcessesByPid(Long pid) throws Exception;
    public Processes getProcessesByProcessesid(Long processesId) throws Exception;
	public List<Processes> getListOfProcessesByUserId(Long userId) throws Exception;
	
	public ProcessesCommanInterface getFirstProgramProcessCommanByProcessesId(Long processesId) throws Exception;
	public ProcessesCommanInterface getIlluminaQcProcessCommanByProcessesId(Long processesId) throws Exception;
    public ProcessesCommanInterface getFourFiveFourProcessCommanByProcessesId(Long processesId ) throws Exception;    
}
