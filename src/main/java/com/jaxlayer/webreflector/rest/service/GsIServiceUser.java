package com.jaxlayer.webreflector.rest.service;

import com.jaxlayer.webreflector.rest.models.User;

public interface GsIServiceUser extends GsIServiceBase<User>{
	public   User getUserById(Long userId) throws Exception;
	public   User getUserLogin(String userName) throws Exception;
	public   User getUserByUserName(String userName) throws Exception;
	
	public   User getInstituteNameByUserName(String userName) throws Exception;
	public   User getAddressByUserName(String userName) throws Exception;
	public   User getDeisgnationByUserName(String userName) throws Exception;
	
	Boolean isUserEmailIdAvailable(String emailId) throws Exception;
}
