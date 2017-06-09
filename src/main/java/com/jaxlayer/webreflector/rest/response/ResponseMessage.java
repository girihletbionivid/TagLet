package com.jaxlayer.webreflector.rest.response;

public class ResponseMessage<T> {
	private String message;
	private int userNo;

	public String getMessage() {
		return message;
	}

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
