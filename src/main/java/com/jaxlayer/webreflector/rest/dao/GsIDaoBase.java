package com.jaxlayer.webreflector.rest.dao;

public interface GsIDaoBase<T> {

	void insert(T t) throws Exception;

	void update(T t) throws Exception;

	void delete(T t) throws Exception;

	T query(T t) throws Exception;

}
