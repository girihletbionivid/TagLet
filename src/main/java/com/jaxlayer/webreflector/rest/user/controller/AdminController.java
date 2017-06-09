package com.jaxlayer.webreflector.rest.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.jaxlayer.webreflector.rest.service.GsIServiceAdmin;

@Controller
public class AdminController {
	@Autowired
	private GsIServiceAdmin serviceAdmin;
}
