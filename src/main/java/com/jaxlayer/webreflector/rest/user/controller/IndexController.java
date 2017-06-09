package com.jaxlayer.webreflector.rest.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class IndexController {
	@Autowired
	private GsIServiceUser serviceUser;

	@RequestMapping("/get/{name}")
	public ModelAndView indexd(@PathVariable String name) {
//		System.out.println("get000000000000000000000000==>" + name);
		ModelAndView mav = new ModelAndView(name);

		return mav;
	}

	@RequestMapping("/my")
	public String indexds(Model model) {
		model.addAttribute("name", Utils.server);
		return "index";
	}
	@RequestMapping(value = { "/savepage" }, method = RequestMethod.GET)
	public String savePage(Model model) {

		return "index";
	}

	@RequestMapping("/index")
	public String greetingd(
			@RequestParam(value = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("server", Utils.server);
		return "index";
	}
	@RequestMapping("/introduction")
	public String greetingddws( @RequestParam(value = "userid", required = true, defaultValue = "1") String userid, Model model) 
	{
		JavaRunCommands f = new JavaRunCommands();
		model.addAttribute("server", Utils.server);
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("maxMerory", Runtime.getRuntime()
					.availableProcessors());
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());
			model.addAttribute("ram", f.getRam());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "internal_index";
	}

	@RequestMapping("/ResultSummary")
	public String greetinginstances(
			@RequestParam(value = "userid", required = true, defaultValue = "1") String userid,
			Model model) {
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());

			model.addAttribute("server", Utils.server);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "instances";
	}
	@RequestMapping("/folders")
	public String getFolders(
			@RequestParam(value = "userid", required = true, defaultValue = "1") String userid,
			Model model) {
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());

			model.addAttribute("server", Utils.server);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "folders";
	}
	@RequestMapping("/reports")
	public String greetingreports(@RequestParam(value = "userid", required = true, defaultValue = "1") String userid, Model model) {
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());

			model.addAttribute("server", Utils.server);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "reports";
	}

	@RequestMapping("/TagLet")
	public String getAssembly(
			@RequestParam(value = "userid", required = true, defaultValue = "1") String userid,
			Model model) {
		try
		{
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);
			model.addAttribute("userName", user.getUserName());
			model.addAttribute("userEmail", user.getEmailId());
			model.addAttribute("userDir", user.getUserDir());
			model.addAttribute("server", Utils.server);
			
			model.addAttribute("designation", user.getDesignation());
			model.addAttribute("institute", user.getInstitute());
			model.addAttribute("address", user.getAddress());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "TagLet";
	}
	
//	QC
	@RequestMapping("/qc454")
	public String getQc454(@RequestParam(value = "userid", required = true, defaultValue = "1") String userid, Model model) {
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());
			model.addAttribute("availCPU", Runtime.getRuntime()
					.availableProcessors());
			model.addAttribute("server", Utils.server);
		} catch (Exception e) {
			e.printStackTrace();
		}

		

		return "qc_454";
	}

	@RequestMapping("/qcillumina")
	public String getQcIllumina(
			@RequestParam(value = "userid", required = true, defaultValue = "1") String userid,
			Model model) {

		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);

			model.addAttribute("userName", user.getUserName());

			model.addAttribute("userEmail", user.getEmailId());

			model.addAttribute("userDir", user.getUserDir());
			model.addAttribute("availCPU", Runtime.getRuntime()
					.availableProcessors());
			model.addAttribute("server", Utils.server);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "qc_illumina";
	}

	@RequestMapping("/qcreport")
	public String getQcReport(
			@RequestParam(value = "userid", required = true, defaultValue = "1") String userid,
			Model model) {
		try {
			User user = serviceUser.getUserById(Long.parseLong(userid));
			model.addAttribute("userId", userid);
			model.addAttribute("userName", user.getUserName());
			model.addAttribute("userEmail", user.getEmailId());
			model.addAttribute("userDir", user.getUserDir());
			model.addAttribute("server", Utils.server);
			
			model.addAttribute("designation", user.getDesignation());
			model.addAttribute("institute", user.getInstitute());
			model.addAttribute("address", user.getAddress());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "qc_report";
	}
	
	@RequestMapping(value = "/get/pag", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public ModelAndView loadMasterPages(@RequestParam("page") String page) {
		System.out.println("yogi is bestd=========>" + page);
		ModelAndView mav = new ModelAndView(page);
		String server = "10.0.0.23";

		mav.addObject(server);
		return mav;
	}

	@RequestMapping(value = "/get/page/{page}", method = RequestMethod.GET)
	public ModelAndView loadMasterPage(@PathVariable String page) {
		System.out.println("yogi is bestd=========>" + page);
		ModelAndView mav = new ModelAndView("index.html");
		String server = "10.0.0.23";

		mav.addObject(server);
		return mav;
	}
}