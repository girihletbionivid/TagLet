package com.jaxlayer.webreflector.rest.dao;

import com.jaxlayer.webreflector.rest.models.IonTorrent;

public interface GsIDaoIonTorrent extends GsIDaoBase<IonTorrent> {
	public IonTorrent getIonTorrentByProcessId(Long processesId) throws Exception;
}
