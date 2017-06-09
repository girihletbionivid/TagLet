package com.jaxlayer.webreflector.rest.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jaxlayer.webreflector.rest.dao.GsIDaoUser;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;

@Service
@Transactional(propagation = Propagation.REQUIRED)
public class GsServiceImplUser implements GsIServiceUser {

	@Autowired
	private GsIDaoUser userDao;

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void insert(User t) throws Exception {
		userDao.insert(t);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public void update(User t) throws Exception {
		userDao.update(t);
	}

	@Override
	public void delete(User t) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public User query(User t) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public User getUserById(Long userId) throws Exception {
		return userDao.getUserById(userId);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public User getUserLogin(String userName)
			throws Exception {
		return userDao.getUserLogin(userName);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Boolean isUserEmailIdAvailable(String emailId) throws Exception {
		return userDao.isUserEmailIdAvailable(emailId);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public User getUserByUserName(String userName) throws Exception {
		return userDao.getUserByUserName(userName);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public User getInstituteNameByUserName(String userName) throws Exception {
		return userDao.getUserByInstituteName(userName);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)

	public User getAddressByUserName(String userName) throws Exception {
		return userDao.getUserByAddress(userName);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)

	public User getDeisgnationByUserName(String userName) throws Exception {
		return userDao.getUserByDesignation(userName);
	}
}
