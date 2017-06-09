package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoFirstProgram;
import com.jaxlayer.webreflector.rest.models.FirstProgram;
import com.jaxlayer.webreflector.rest.service.GsIServiceFirstProgram;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplFirstProgram implements GsIServiceFirstProgram
{
	@Autowired
	private GsIDaoFirstProgram daoFirstProgram;

	@Override
	public void insert(FirstProgram t) throws Exception
	{
		daoFirstProgram.insert(t);
	}

	@Override
	public void update(FirstProgram t) throws Exception 
	{
		daoFirstProgram.update(t);
	}

	@Override
	public void delete(FirstProgram t) throws Exception 
	{
		daoFirstProgram.delete(t);
	}

	@Override
	public FirstProgram query(FirstProgram t) throws Exception 
	{
		return daoFirstProgram.query(t);
	}

	@Override
	public FirstProgram getFirstProgramByProcessId(Long processesId) throws Exception
	{
		return daoFirstProgram.getFirstProgramProcessId(processesId);
	}
	
	
}
