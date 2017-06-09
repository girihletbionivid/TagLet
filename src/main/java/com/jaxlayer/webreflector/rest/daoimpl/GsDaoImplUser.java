package com.jaxlayer.webreflector.rest.daoimpl;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoUser;
import com.jaxlayer.webreflector.rest.models.User;

@Repository
public class GsDaoImplUser implements GsIDaoUser {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void insert(User t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();
	}

	@Override
	public void update(User t) throws Exception {

		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

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
	public User getUserById(Long userId) throws Exception {
		User user = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("userId", userId));

		user = (User) criteria.uniqueResult();
		System.out.println("*****************==>" + user);
		if (user == null) {
			throw new Exception("user not found of id "+userId+"..!");
		}
		return user;
	}

	@Override
	public User getUserLogin(String emailId) throws Exception {
		User user = null;

		System.out.println("***emailId**************==>" + emailId);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("emailId", emailId));

		user = (User) criteria.uniqueResult();
		System.out.println("**user**************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
		}

		return user;
	}

	@Override
	public Boolean isUserEmailIdAvailable(String emailId) throws Exception {
		User user = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("emailId", emailId));

		user = (User) criteria.uniqueResult();
		System.out.println("*****************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
			return false;

		}
		return true;
	}

	@Override
	public User getUserByUserName(String userName) throws Exception {
		User user = null;

		System.out.println("***emailId**************==>" + userName);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("userName", userName));

		user = (User) criteria.uniqueResult();
		System.out.println("**user**************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
		}

		return user;
	}

	@Override
	public User getUserByDesignation(String userName) throws Exception {
		User user = null;

		System.out.println("***emailId**************==>" + userName);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("userName", userName));

		user = (User) criteria.uniqueResult();
		System.out.println("**user**************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
		}

		return user;
	}

	@Override
	public User getUserByInstituteName(String userName) throws Exception {
		User user = null;

		System.out.println("***emailId**************==>" + userName);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("userName", userName));

		user = (User) criteria.uniqueResult();
		System.out.println("**user**************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
		}

		return user;
	}

	@Override
	public User getUserByAddress(String userName) throws Exception {
		User user = null;

		System.out.println("***emailId**************==>" + userName);
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(User.class)
				.add(Restrictions.eq("userName", userName));

		user = (User) criteria.uniqueResult();
		System.out.println("**user**************==>" + user);
		if (user == null) {
			user = new User();
			user.setUserId(-1l);
		}

		return user;
	}

}
