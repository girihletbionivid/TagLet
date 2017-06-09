package com.jaxlayer.webreflector.rest.service;

import com.jaxlayer.webreflector.rest.models.IonTorrent;

public interface GsIServiceIonTorrent extends GsIServiceBase<IonTorrent> {
	public IonTorrent getIonTorrentByProcessId(Long processesId)
			throws Exception;

}
