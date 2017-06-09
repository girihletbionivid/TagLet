package com.jaxlayer.webreflector.rest.user.controller;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.models.UserReports;
import com.jaxlayer.webreflector.rest.response.JdJsonListResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.rest.service.GsIServiceUserReport;

@Controller
public class GetReportsController {
	@Autowired
	private GsIServiceUser serviceUser;
	@Autowired
	private GsIServiceUserReport serviceUserReports;

	@RequestMapping(value = "/user/get/reports", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<UserReports>> getReports(
			@RequestParam("userId") Long userId) {
		ResponseEntity<JdJsonListResponse<UserReports>> entity = null;
		JdJsonListResponse<UserReports> response = new JdJsonListResponse<UserReports>();
		Collection<UserReports> listOfProcesses = new ArrayList<UserReports>();
		HttpHeaders headers = addAccessControllAllowOrigin();
		User user = null;
		try {
			user = serviceUser.getUserById(userId);
			if (user != null) {
				listOfProcesses = serviceUserReports.getReportsByUserId(userId);
				response.setId(userId);
				response.setList(listOfProcesses);
				response.setMessage("");
				response.setStatus("SUCCESS");
				entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
						response, headers, HttpStatus.OK);
			} else {
				response.setId(userId);
				response.setList(listOfProcesses);
				response.setMessage("User not present");
				response.setStatus("FAILED");
				entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
						response, headers, HttpStatus.NOT_FOUND);
			}
			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(userId);
			response.setList(listOfProcesses);
			response.setMessage(e.getCause() + "==" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/user/delete/report", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<UserReports>> deleteReports(
			@RequestParam("userId") Long userId,
			@RequestParam("reportId") Long reportId) {
		ResponseEntity<JdJsonListResponse<UserReports>> entity = null;
		JdJsonListResponse<UserReports> response = new JdJsonListResponse<UserReports>();
		Collection<UserReports> listOfProcesses = new ArrayList<UserReports>();
		HttpHeaders headers = addAccessControllAllowOrigin();
		User user = null;
		try {
			user = serviceUser.getUserById(userId);
			if (user != null) {
				UserReports userReport = serviceUserReports
						.getReportByReportId(reportId);
				serviceUserReports.delete(userReport);
				response.setId(userId);
				response.setList(listOfProcesses);
				response.setMessage("");
				response.setStatus("SUCCESS");
				entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
						response, headers, HttpStatus.OK);
			} else {
				response.setId(userId);
				response.setList(listOfProcesses);
				response.setMessage("User not present");
				response.setStatus("FAILED");
				entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
						response, headers, HttpStatus.NOT_FOUND);
			}
			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(userId);
			response.setList(listOfProcesses);
			response.setMessage(e.getCause() + "==" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<UserReports>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

}
