package com.jaxlayer.webreflector.rest.configurations;

import java.util.Properties;

import org.apache.commons.dbcp.BasicDataSource;
import org.hibernate.SessionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.orm.hibernate4.HibernateTransactionManager;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
@Configuration
@EnableTransactionManagement
@EnableWebSocketMessageBroker

public class JdHibernateConfig extends AbstractWebSocketMessageBrokerConfigurer 
{
	@Bean
	public SessionFactory sessionFactory() 
	{

		LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
		sessionFactory.setDataSource(getDataSource());
		sessionFactory.setHibernateProperties(getLocalPostgresSqlPropreties());
		sessionFactory
				.setPackagesToScan(new String[] { "com.jaxlayer.webreflector.rest.models" });

		try {
			sessionFactory.afterPropertiesSet();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sessionFactory.getObject();
	}
	@Bean
	public HibernateTransactionManager transactionManager() {

		HibernateTransactionManager manager = new HibernateTransactionManager();
		manager.setSessionFactory(sessionFactory());
		return manager;
	}
	@Bean
	public BasicDataSource getDataSource() {

		return localPostgresSqlDataSource();
	}

	private BasicDataSource localPostgresSqlDataSource() {

		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName("org.postgresql.Driver");
		dataSource.setUrl("jdbc:postgresql://localhost:5432/usdb");
		dataSource.setUsername("postgres");
		dataSource.setPassword("postgres");
		return dataSource;

	}

	private Properties getLocalPostgresSqlPropreties() {

		Properties propreties = new Properties();
		propreties.setProperty("hibernate.show_sql", "true");
		propreties.setProperty("hibernate.format_sql", "true");
		propreties.setProperty("hibernate.hbm2ddl.auto", "update");

		propreties.setProperty("hibernate.dialect",
				"org.hibernate.dialect.PostgreSQL82Dialect");

		return propreties;
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) 
	{
		registry.addEndpoint("/questions").withSockJS().setInterceptors(httpSessionIdHandshakeInterceptor());
	}
	@Bean
	public HttpSessionIdHandshakeInterceptor httpSessionIdHandshakeInterceptor() 
	{
		return new HttpSessionIdHandshakeInterceptor();
	}
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) 
	{
		registry.setApplicationDestinationPrefixes("/app").enableSimpleBroker("/topic","/queue");
	}
}
