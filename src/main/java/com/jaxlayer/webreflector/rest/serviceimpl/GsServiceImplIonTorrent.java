package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoIonTorrent;
import com.jaxlayer.webreflector.rest.models.IonTorrent;
import com.jaxlayer.webreflector.rest.service.GsIServiceIonTorrent;
@Service
@Transactional(propagation=Propagation.REQUIRED)
public class GsServiceImplIonTorrent implements GsIServiceIonTorrent {

	@Autowired
	private GsIDaoIonTorrent daoIonTorrent;
	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void insert(IonTorrent t) throws Exception {
		daoIonTorrent.insert(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void update(IonTorrent t) throws Exception {
		daoIonTorrent.update(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public void delete(IonTorrent t) throws Exception {
		daoIonTorrent.delete(t);		
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public IonTorrent query(IonTorrent t) throws Exception {
		return daoIonTorrent.query(t);
	}

	@Override
	@Transactional(propagation=Propagation.REQUIRED)
	public IonTorrent getIonTorrentByProcessId(Long processesId)
			throws Exception {
		return daoIonTorrent.getIonTorrentByProcessId(processesId);
	}

}
