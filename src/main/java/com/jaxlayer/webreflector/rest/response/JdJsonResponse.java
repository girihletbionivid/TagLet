package com.jaxlayer.webreflector.rest.response;

public class JdJsonResponse {

	private String status;
	private String actor;
	private String message;

	private Long id;

	public long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getActor() {
		return actor;
	}

	public void setActor(String actor) {
		this.actor = actor;
	}

	public void setMessage(String string) {
		this.message = string;
	}

	public String getMessage() {
		return message;
	}
}
