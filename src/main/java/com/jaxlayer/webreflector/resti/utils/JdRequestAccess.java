package com.jaxlayer.webreflector.resti.utils;

import org.springframework.http.HttpHeaders;

public class JdRequestAccess {

	private static HttpHeaders headers;

	static {

		headers = new HttpHeaders();
		headers.add("Access-Control-Allow-Origin", "*");
	}

	public static HttpHeaders addAccessControllAllowOrigin() {

		return headers;
	}
}
