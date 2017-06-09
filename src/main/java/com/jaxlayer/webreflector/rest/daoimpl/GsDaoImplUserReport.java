package com.jaxlayer.webreflector.rest.daoimpl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jaxlayer.webreflector.rest.dao.GsIDaoUserReport;
import com.jaxlayer.webreflector.rest.models.UserReports;

@Repository
public class GsDaoImplUserReport implements GsIDaoUserReport {
	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void insert(UserReports t) throws Exception {
		sessionFactory.getCurrentSession().save(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void update(UserReports t) throws Exception {
		sessionFactory.getCurrentSession().update(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public void delete(UserReports t) throws Exception {
		sessionFactory.getCurrentSession().delete(t);
		sessionFactory.getCurrentSession().flush();

	}

	@Override
	public UserReports query(UserReports t) throws Exception {
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UserReports> getReportsByUserId(Long userId) throws Exception {
		List<UserReports> list = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(UserReports.class)
				.add(Restrictions.eq("user.userId", userId));

		list = criteria.list();
		if (list == null) {
			list = new ArrayList<UserReports>();
		}
		return list;
	}

	@Override
	public UserReports getReportByReportId(Long reportId) throws Exception {
	UserReports userReport = null;
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(UserReports.class)
				.add(Restrictions.eq("userReportsId", reportId));

		userReport  = (UserReports) criteria.uniqueResult();
		if (userReport == null) {
			userReport = new UserReports();
		}
		return userReport;
	}

}
