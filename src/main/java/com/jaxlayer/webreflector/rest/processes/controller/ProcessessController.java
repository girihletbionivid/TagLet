package com.jaxlayer.webreflector.rest.processes.controller;

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

import com.jaxlayer.webreflector.rest.models.FirstProgram;
import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;
import com.jaxlayer.webreflector.rest.models.IlluminaQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.response.JdJsonListResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceFFFQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceFirstProgram;
import com.jaxlayer.webreflector.rest.service.GsIServiceIlluminaQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.rest.service.ProcessesCommanInterface;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;

@Controller
public class ProcessessController 
{
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private GsIServiceUser serviceUser;
	@Autowired
	private GsIServiceFirstProgram serviceFirstProgram;
	
	@Autowired
	private GsIServiceIlluminaQc serviceIllumina;
	@Autowired
	private GsIServiceFFFQc serviceFFFQc;

	@RequestMapping(value = "/user/close/process", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> processesCloseUser(@RequestParam("pid") Long pid) 
	{
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		User user = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		
		try {
			if (pid != null) {
				Processes processes = serviceProcesses.getProcessesByPid(pid);
				user = processes.getUser();
				Long userId = processes.getUser().getUserId();
				user = serviceUser.getUserById(userId);
				if (user != null) {
					JavaRunCommands rcmd = new JavaRunCommands();

					rcmd.executeCommandOnlyKill(pid, serviceProcesses);
					removeProcessById(processes.getProcessId());
					listOfProcesses = user.getListOfProcess();
					listOfProcesses.remove(processes);
					response.setId(pid);
					response.setList(listOfProcesses);
					response.setMessage("" + user.getUserName());
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonListResponse<Processes>>(
							response, headers, HttpStatus.OK);
				} else {
					removeProcessById(processes.getProcessId());
					listOfProcesses = user.getListOfProcess();
					listOfProcesses.remove(processes);
					response.setId(pid);
					response.setList(listOfProcesses);
					response.setMessage("" + user.getUserName());
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonListResponse<Processes>>(
							response, headers, HttpStatus.OK);
				}
			} else {
				response.setId(pid);
				response.setList(listOfProcesses);
				response.setMessage("User not found.");
				response.setStatus("FAILED");
				entity = new ResponseEntity<JdJsonListResponse<Processes>>(
						response, headers, HttpStatus.NOT_FOUND);
			}

			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(pid);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/user/output/process", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> processesOutputUser(
			@RequestParam("processid") Long processid) {
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		User user = null;
		
		HttpHeaders headers = addAccessControllAllowOrigin();

		try 
		{
			Processes processes = serviceProcesses.getProcessesByProcessesid(processid);
			response.setId(processid);
			response.setList(listOfProcesses);
			response.setMessage("" + processes.getProcessLog());
			response.setStatus("SUCCESS");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.OK);

			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(processid);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/user/remove/process", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> processesRemove(
			@RequestParam("processid") Long processid) {
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		User user = null;
		HttpHeaders headers = addAccessControllAllowOrigin();

		try {
			Processes processes = serviceProcesses
					.getProcessesByProcessesid(processid);

			if (processes != null) 
			{
				Long userId = processes.getUser().getUserId();
				user = serviceUser.getUserById(userId);
				Long pid = processes.getPID();
				
				if (user != null) 
				{
					if (processes.getProcessType().equals("US Project")) 
					{
						FirstProgram firstProg = serviceFirstProgram
								.getFirstProgramByProcessId(pid);
						serviceFirstProgram.delete(firstProg);

					}else if (processes.getProcessType().equals("IlluminaQc")) {
						IlluminaQc illuminaQC = serviceIllumina
								.getIlluminaByProcessId(pid);
						serviceIllumina.delete(illuminaQC);
					}else if (processes.getProcessType().equals("FourFiveFourQc")) {
						FourFiveFourQc illuminaQC = serviceFFFQc
								.getFourFiveFourQcByProcessId(pid);
					
						serviceFFFQc.delete(illuminaQC);
					}
					
					listOfProcesses = user.getListOfProcess();
					listOfProcesses.remove(processes);

					listOfProcesses = serviceProcesses.getListOfProcessesByUserId(user.getUserId());
					response.setId(processid);
					response.setList(listOfProcesses);
					response.setMessage("" + user.getUserName());
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonListResponse<Processes>>(response, headers, HttpStatus.OK);

				} 
				else 
				{
					response.setId(processid);
					response.setList(listOfProcesses);
					response.setMessage("User not found.");
					response.setStatus("FAILED");
					entity = new ResponseEntity<JdJsonListResponse<Processes>>(
							response, headers, HttpStatus.NOT_FOUND);
				}

			} 
			else 
			{
				response.setId(processid);
				response.setList(listOfProcesses);
				response.setMessage("Process not found of id " + processid);
				response.setStatus("FAILED");
				entity = new ResponseEntity<JdJsonListResponse<Processes>>(
						response, headers, HttpStatus.NOT_FOUND);
			}
			return entity;

		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			response.setId(processid);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}
	}

	public Boolean removeProcessById(Long processid) throws Exception {

		Processes processes = serviceProcesses
				.getProcessesByProcessesid(processid);

		Long userId = processes.getUser().getUserId();
		User user = serviceUser.getUserById(userId);
		Long pid = processes.getPID();
		
		if (processes.getProcessType().equals("US Project")) 
		{
			FirstProgram firstProgram = serviceFirstProgram.getFirstProgramByProcessId(pid);
			serviceFirstProgram.delete(firstProgram);

		}
		if (processes.getProcessType().equals("IlluminaQc")) {
			IlluminaQc illuminaQC = serviceIllumina.getIlluminaByProcessId(pid);
			serviceIllumina.delete(illuminaQC);
		}
		if (processes.getProcessType().equals("FourFiveFourQc")) {
			FourFiveFourQc illuminaQC = serviceFFFQc
					.getFourFiveFourQcByProcessId(pid);
			/*System.out.println("get in fourfivefor+++++++++++---++++---++");*/
			serviceFFFQc.delete(illuminaQC);
		}
		return true;
	}

	@RequestMapping(value = "/user/remove/processss", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> procesaasesCloseUser(
			@RequestParam("processid") Long pid) {
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		User user = null;
		HttpHeaders headers = addAccessControllAllowOrigin();

		try {
			Processes processes = serviceProcesses
					.getProcessesByProcessesid(pid);
			user = processes.getUser();
			Long userId = processes.getUser().getUserId();

			JavaRunCommands rcmd = new JavaRunCommands();

			if (!rcmd.executeCommandOnlyKill(pid, serviceProcesses)) 
			{
				if (processes.getProcessType().equals("US Project")) 
				{
					FirstProgram firstProgram = serviceFirstProgram.getFirstProgramByProcessId(pid);
					serviceFirstProgram.delete(firstProgram);
				}
				if (processes.getProcessType().equals("IlluminaQc")) {
					IlluminaQc illuminaQC = serviceIllumina
							.getIlluminaByProcessId(pid);
					serviceIllumina.delete(illuminaQC);
				}
				if (processes.getProcessType().equals("FourFiveFourQc")) {
					FourFiveFourQc illuminaQC = serviceFFFQc
							.getFourFiveFourQcByProcessId(pid);
					/*System.out.println("get in fourfivefor+++++++++++---++++---++");*/
					serviceFFFQc.delete(illuminaQC);
				}
			}

			user = serviceUser.getUserById(userId);
			if (user != null) {
				listOfProcesses = user.getListOfProcess();
				listOfProcesses.remove(processes);

				listOfProcesses = serviceProcesses.getListOfProcessesByUserId(user.getUserId());
				response.setId(pid);
				response.setList(listOfProcesses);
				response.setMessage("" + user.getUserName());
				response.setStatus("SUCCESS");
				entity = new ResponseEntity<JdJsonListResponse<Processes>>(
						response, headers, HttpStatus.OK);
			} else {
				response.setId(pid);
				response.setList(listOfProcesses);
				response.setMessage("");
				response.setStatus("FAILED");
				entity = new ResponseEntity<JdJsonListResponse<Processes>>(
						response, headers, HttpStatus.NOT_FOUND);
			}

			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(pid);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}
	}

	@RequestMapping(value = "/user/get/process", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> processesUser(
			@RequestParam("userId") Long userId) {
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		HttpHeaders headers = addAccessControllAllowOrigin();

		try {
			listOfProcesses = serviceProcesses
					.getListOfProcessesByUserId(userId);
			response.setId(userId);
			response.setList(listOfProcesses);
			response.setMessage("");
			response.setStatus("SUCCESS");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.OK);

			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(userId);
			response.setList(listOfProcesses);
			response.setMessage(e.getCause() + "==" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/processes/get/attributes", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<ProcessesCommanInterface>> getProcessesAttribute(
			@RequestParam("processesId") Long processesId,
			@RequestParam("processType") String processType)
	{
		ResponseEntity<JdJsonListResponse<ProcessesCommanInterface>> entity = null;
		JdJsonListResponse<ProcessesCommanInterface> response = new JdJsonListResponse<ProcessesCommanInterface>();
		Collection<ProcessesCommanInterface> listOfProcesses = new ArrayList<ProcessesCommanInterface>();
		ProcessesCommanInterface processesCommanInterface = null;
		HttpHeaders headers = addAccessControllAllowOrigin();

		try 
		{
			if (processType.equals("US Project")) 
			{
//				System.out.println(processesId);
				processesCommanInterface = serviceProcesses.getFirstProgramProcessCommanByProcessesId(processesId);
//				System.out.println(processesCommanInterface.toString());
			}
			else if (processType.equals("illumina_report")
					|| processType.equals("IlluminaQc")) {
				processesCommanInterface = serviceProcesses
						.getIlluminaQcProcessCommanByProcessesId(processesId);
			} else if (processType.equals("FourFiveFourQcReport")
					|| processType.equals("FourFiveFourQc")) {
			/*	System.out.println("four five four====================>");*/
				processesCommanInterface = serviceProcesses
						.getFourFiveFourProcessCommanByProcessesId(processesId);
			}
			if (processesCommanInterface != null) 
			{
				listOfProcesses.add(processesCommanInterface);
				response.setId(processesId);
				response.setList(listOfProcesses);
				response.setMessage("");
				response.setStatus("SUCCESS");
				entity = new ResponseEntity<JdJsonListResponse<ProcessesCommanInterface>>(
						response, headers, HttpStatus.OK);
			}
			return entity;
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			response.setId(processesId);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<ProcessesCommanInterface>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}
	}

	@RequestMapping(value = "/processes/resume", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<JdJsonListResponse<Processes>> resumeProcessesAttribute(
			@RequestParam("processesId") Long processesId,
			@RequestParam("step") String step) {
		ResponseEntity<JdJsonListResponse<Processes>> entity = null;
		JdJsonListResponse<Processes> response = new JdJsonListResponse<Processes>();
		ProcessesCommanInterface processesCommanInterface = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		Collection<Processes> listOfProcesses = new ArrayList<Processes>();
		try {
			Processes pro = serviceProcesses
					.getProcessesByProcessesid(processesId);
			// /
			listOfProcesses = serviceProcesses.getListOfProcessesByUserId(pro
					.getUser().getUserId());
			pro.setNextProcesses("reporting,Taxonomy");
			JavaRunCommands rcmd = new JavaRunCommands();
			rcmd.executeCommandAllUser(pro.getProcessCmd(), pro.getUser(),
					serviceProcesses, pro);

			response.setId(processesId);
			response.setList(listOfProcesses);
			response.setMessage("");
			response.setStatus("SUCCESS");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.OK);

			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			response.setId(processesId);
			response.setList(listOfProcesses);
			response.setMessage("" + e.getMessage());
			response.setStatus("FAILED");
			entity = new ResponseEntity<JdJsonListResponse<Processes>>(
					response, headers, HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}
}
