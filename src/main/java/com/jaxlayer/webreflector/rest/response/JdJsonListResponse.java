package com.jaxlayer.webreflector.rest.response;

import java.util.ArrayList;
import java.util.Collection;

public class JdJsonListResponse<T> {

	private Long id;
	private String message;
	private Collection<T> list = new ArrayList<T>();
	private String status;

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Collection<T> getList() {
		return list;
	}

	public void setList(Collection<T> list) {
		this.list = list;
	}
}
