package com.jaxlayer.webreflector.rest.service;

public interface GsIServiceBase<T> {

	void insert(T t) throws Exception;

	void update(T t) throws Exception;

	void delete(T t) throws Exception;

	T query(T t) throws Exception;
}
