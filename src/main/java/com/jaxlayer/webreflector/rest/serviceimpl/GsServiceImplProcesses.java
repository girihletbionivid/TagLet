package com.jaxlayer.webreflector.rest.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoProcesses;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplProcesses implements GsIServiceProcesses{

	@Autowired
	private GsIDaoProcesses processesDao;
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insert(Processes t) throws Exception {
		processesDao.insert(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(Processes t) throws Exception {
		processesDao.update(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void delete(Processes t) throws Exception {
		processesDao.delete(t);		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Processes query(Processes t) throws Exception {
		return processesDao.query(t);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Processes getProcessesByPid(Long pid) throws Exception {
		return processesDao.getProcessesByPid(pid);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Processes> getListOfProcessesByUserId(Long userId)
			throws Exception {
		return processesDao.getListOfProcessesByUserId(userId);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Processes getProcessesByProcessesid(Long processesId)
			throws Exception {
		return processesDao.getProcessesByProcessesid(processesId);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public ProcessesCommanInterface getFirstProgramProcessCommanByProcessesId(Long processesId) throws Exception 
	{
		return processesDao.getFirstProgramProcessCommanByProcessesId(processesId);
	}
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public ProcessesCommanInterface getIlluminaQcProcessCommanByProcessesId(
			Long processesId) throws Exception {
		return processesDao.getIlluminaQcProcessCommanByProcessesId(processesId);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public ProcessesCommanInterface getFourFiveFourProcessCommanByProcessesId(
			Long processesId) throws Exception {
		return processesDao.getFourFiveFourProcessCommanByProcessesId(processesId);
	}
}
