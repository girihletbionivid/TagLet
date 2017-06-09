package com.jaxlayer.webreflector.rest.user.controller;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
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
import com.jaxlayer.webreflector.rest.response.JdJsonListResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.resti.utils.MultiFolderReading;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class DirectoryController {
	@Autowired
	private GsIServiceUser serviceUser;
	@RequestMapping(value = "get/user/directory", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<String>> getTes(
			@RequestParam("extensions") String extensions,
			@RequestParam("userName") String userName) {
		ResponseEntity<JdJsonListResponse<String>> entity = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		MultiFolderReading mf = new MultiFolderReading();
		List<String> l = new ArrayList<String>();
		JdJsonListResponse<String> response;
		try {
			User user=serviceUser.getUserByUserName(userName);
			
		//String str = user.getUserDir();
			String str =user.getUserDir();
		JSONObject json = new JSONObject();
		System.out.println("===========user=======>"+str);
	
			mf.checkNoOfFiles(str.trim(), json, extensions);
			json.put("TestData",Utils.CURRENT_WORKING_DIR + "/TestData");
			l.add(json.toString());
			response = new JdJsonListResponse<String>();
			response.setId(-1l);
			response.setList(l);
			response.setMessage("");
			response.setStatus("SUCCESS");
			entity = new ResponseEntity<JdJsonListResponse<String>>(response,
					headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			response = new JdJsonListResponse<String>();
			response.setId(-1l);
			response.setList(l);
			response.setMessage("There no root directory");
			response.setStatus("Failed");
			entity = new ResponseEntity<JdJsonListResponse<String>>(response,
					headers, HttpStatus.EXPECTATION_FAILED);
		}
		return entity;
	}

	@RequestMapping(value = "get/sub/directory", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<String>> getTesse(
			@RequestParam("extensions") String extensions,
			@RequestParam("userName") String userName) {
		ResponseEntity<JdJsonListResponse<String>> entity = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		MultiFolderReading mf = new MultiFolderReading();
		String str = userName;
		JSONObject json = new JSONObject();

		JdJsonListResponse<String> response;
		List<String> l = new ArrayList<String>();
		try {
			mf.getSubFiles(str, json, extensions);
			l.add(json.toString());
			response = new JdJsonListResponse<String>();
			response.setId(-1l);
			response.setList(l);
			response.setMessage("");
			response.setStatus("SUCCESS");
			entity = new ResponseEntity<JdJsonListResponse<String>>(response,
					headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			response = new JdJsonListResponse<String>();
			response.setId(-1l);
			response.setList(l);
			response.setMessage("There no root directory");
			response.setStatus("Failed");
			entity = new ResponseEntity<JdJsonListResponse<String>>(response,
					headers, HttpStatus.EXPECTATION_FAILED);
		}

		return entity;
	}



	@RequestMapping(value = "create/sub/directory", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<String>> createTesse(
			@RequestParam("extensions") String extensions,
			@RequestParam("userName") String userName,
			@RequestParam("fileName") String fileName) {
		ResponseEntity<JdJsonListResponse<String>> entity = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		MultiFolderReading mf = new MultiFolderReading();
		String str = fileName;
	//	System.out.println("yodogg==>" + str);
		JSONObject json = new JSONObject();
		JdJsonListResponse<String> response;
		List<String> l = new ArrayList<String>();
		try {
			File file = new File(fileName);
			if (!file.exists()) {
				if (file.mkdir()) {
					mf.checkNoOfFiles(file.getParentFile()
							.getAbsolutePath(), json, extensions);
					/*mf.checkNoOfFilesWithoutExtension(file.getParentFile()
							.getAbsolutePath(), json, extensions);*/
					json.put("TestData",Utils.CURRENT_WORKING_DIR + "/TestData");
					l.add(json.toString());
					//System.out.println(json.toString() + "created ==>" + str);
					
					response = new JdJsonListResponse<String>();
					response.setId(-1l);
					response.setList(l);
					response.setMessage("");
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonListResponse<String>>(
							response, headers, HttpStatus.OK);
				} else {
					response = new JdJsonListResponse<String>();
					response.setId(-1l);
					response.setList(l);
					response.setMessage(str + " Folder path not present..!");
					response.setStatus("Failed");
					entity = new ResponseEntity<JdJsonListResponse<String>>(
							response, headers, HttpStatus.EXPECTATION_FAILED);
				}
			} else {
				mf.checkNoOfFiles(file.getParentFile()
						.getAbsolutePath(), json, extensions);
				json.put("TestData",Utils.CURRENT_WORKING_DIR + "/TestData");
			//	System.out.println(json.toString() + "existe already==>" + str);
				l.add(json.toString());
				response = new JdJsonListResponse<String>();
				response.setId(-1l);
				response.setList(l);
				response.setMessage("Folder with same file already present..!");
				response.setStatus("Failed");
				entity = new ResponseEntity<JdJsonListResponse<String>>(
						response, headers, HttpStatus.EXPECTATION_FAILED);
			}

		} catch (Exception e) {
			e.printStackTrace();
			response = new JdJsonListResponse<String>();
			response.setId(-1l);
			response.setList(l);
			response.setMessage("There no root directory");
			response.setStatus("Failed");
			entity = new ResponseEntity<JdJsonListResponse<String>>(response,
					headers, HttpStatus.EXPECTATION_FAILED);
		}

		return entity;
	}
}