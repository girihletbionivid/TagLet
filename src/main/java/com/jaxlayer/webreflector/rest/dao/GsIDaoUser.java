package com.jaxlayer.webreflector.rest.dao;

import com.jaxlayer.webreflector.rest.models.User;

public interface GsIDaoUser extends GsIDaoBase<User> {
	public   User getUserById(Long userId) throws Exception;
	public   User getUserLogin(String userName) throws Exception;
	public   User getUserByUserName(String userName) throws Exception;
	
	public   User getUserByDesignation(String userName) throws Exception;
	public   User getUserByInstituteName(String userName) throws Exception;
	public   User getUserByAddress(String userName) throws Exception;
	Boolean isUserEmailIdAvailable(String emailId) throws Exception;
}
