package com.jaxlayer.webreflector.rest.Controller;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipOutputStream;

import javax.print.DocFlavor.INPUT_STREAM;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.jfree.ui.about.ProjectInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jaxlayer.webreflector.rest.models.FirstProgram;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.models.UserReports;
import com.jaxlayer.webreflector.rest.response.JdJsonResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceFirstProgram;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.rest.service.GsIServiceUserReport;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.MakeReportFirstProgram;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class FirstProgramController 
{
	@Autowired
	private GsIServiceUser serviceUser;
	
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	
	@Autowired
	private GsIServiceFirstProgram serviceFirstProgram;
	
	@Autowired
	private GsIServiceUserReport serviceUserReport;
	
	@RequestMapping(value = "/TagLet", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<JdJsonResponse> runFirstProgram(
			@RequestParam("projectName") String projectName,
			
			@RequestParam("ScientistName") String scientistName,
			@RequestParam("Specialization") String specialization,
			@RequestParam("Address") String address,
			
			@RequestParam("processMode") String processMode,
			@RequestParam("truncation") Integer truncation,
			@RequestParam("outputPrefix") String outputPrefix,
			@RequestParam("repeatFilter") String repeatFilter,
			
			@RequestParam("inptuFileName") String inptuFileName,
			@RequestParam("outputFolder") String outputFolder,
			
			@RequestParam("userId") Long userId
		) throws Exception 
	{
		ResponseEntity<JdJsonResponse> entity = null;
		JdJsonResponse response = new JdJsonResponse();
		JavaRunCommands rcmd = new JavaRunCommands();
		try
		{
			User user = serviceUser.getUserById(userId);
			if (user != null) 
			{
				Collection<UserReports> reportTable = new ArrayList<UserReports>();
				reportTable = serviceUserReport.getReportsByUserId(userId);
				List<String> uuid_for_db_reports = new ArrayList<String>();
				for(UserReports element: reportTable)
				{
					uuid_for_db_reports.add(element.getUniqueNameForMultipleReportsInOneProcess());
				}
				String uuid = rcmd.getUUID(uuid_for_db_reports,  UUID.randomUUID().toString().replaceAll("-", ""));
				
				
				Processes processes = new Processes();
				processes.setProcessName("TagLet");
				processes.setProcessType("US Project");
				processes.setReportPathToDownload(Utils.PDF_FILE_PATH  + outputPrefix + ".zip");
				processes.setReportPathToServer(Utils.PATH_SERVER_URL  + outputPrefix + ".zip");
				processes.setProjectName(projectName);
				processes.setUser(user);
				
				FirstProgram firstProg = new FirstProgram();
				
				firstProg.setProjectName(projectName);
				firstProg.setOutputFolder(outputFolder);
				
				firstProg.setInptuFileName(inptuFileName);
				firstProg.setProcessMode(processMode);
				firstProg.setTruncation(truncation);
				firstProg.setOutputPrefix(outputPrefix);
				firstProg.setProcesses(processes);
				
				serviceFirstProgram.insert(firstProg);
				
				processes.setProcessesTypeId(firstProg.getTagLetProcessId());
				
				/*File file = new File(inptuFileName);
				
				String outputpfaFile = file.getParent() + "/" + outputPrefix + ".fa";
				String outputpunfaFile = file.getParent() + "/" + outputPrefix + ".unfa";
				*/
				
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH:mm");
				Date date = new Date();
				String pdfName = "Result_Files";
				String currentTime = pdfName.trim() + "_" + dateFormat.format(date).trim();
				
				String command = Utils.RUN_SCRIPT_FOR_PROGRAM + inptuFileName + " " + outputPrefix + " " 
								+ processMode + " " + outputFolder + " " + repeatFilter 
								+ " " + truncation + " " + Utils.PDF_FILE_PATH + " " + Utils.RUN_BAR_CHART
								/* + " " + Utils.RUN_N50_SCRIPT + " " + Utils.PDF_FILE_PATH + currentTime.trim()*/;
				
				System.out.println("Command: " + command);
				String output = rcmd.executeCommandAllUser(command, user, serviceProcesses, processes);
				System.out.println(output + "\n\n");
				
				/*String pdfFilePath;
				pdfFilePath = Utils.PDF_FILE_PATH + currentTime.trim() + ".pdf";
				
				MakeReportFirstProgram report = new MakeReportFirstProgram();
				
				if(report.createPDFReport(output, pdfFilePath, projectName, scientistName, specialization, address))
				{*/
				
					UserReports userReports = new UserReports();
					userReports = new UserReports();
					
					userReports.setProcessName("TagLet");
					userReports.setDateOfCreation(System .currentTimeMillis() + "");
					userReports.setDownloadLink("" + Utils.PATH_SERVER_URL  + outputPrefix + ".zip");
					userReports.setPathOnSystem("" + Utils.PDF_FILE_PATH  + outputPrefix + ".zip");
					userReports.setProjectName(projectName);
					userReports.setUniqueNameForMultipleReportsInOneProcess(uuid);
					userReports.setUser(user);
					serviceUserReport.insert(userReports);
					
					
/*					userReports.setProcessName("PDF Report Of TagLet For " + projectName);
					userReports.setDateOfCreation(System .currentTimeMillis() + "");
					userReports.setDownloadLink(Utils.PATH_SERVER_URL  + currentTime + ".pdf");
					userReports.setPathOnSystem(pdfFilePath);
					userReports.setProjectName(projectName);
					userReports.setUser(user);
					serviceUserReport.insert(userReports);
*/					
/*					userReports = new UserReports();
					userReports.setProcessName("Final CSV Report File For " + projectName);
					userReports.setDateOfCreation(System .currentTimeMillis() + "");
					userReports.setDownloadLink("" + Utils.PATH_SERVER_URL  + outputPrefix + ".csv");
					userReports.setPathOnSystem(""  + Utils.PDF_FILE_PATH + outputPrefix + ".csv");
					userReports.setProjectName(projectName);
					userReports.setUser(user);
					userReports.setUniqueNameForMultipleReportsInOneProcess(uuid);
					serviceUserReport.insert(userReports);
*/					
					
/*					userReports = new UserReports();
					userReports.setProcessName("Unique Tag File Of TagLet For " + projectName);
					userReports.setDateOfCreation(System .currentTimeMillis() + "");
					userReports.setDownloadLink(Utils.PATH_SERVER_URL + currentTime.trim() + "" + outputPrefix + ".unfa");
					userReports.setPathOnSystem(Utils.PATH_SERVER_URL + currentTime.trim() + "" + outputPrefix + ".unfa");
					userReports.setProjectName(projectName);
					userReports.setUser(user);
					serviceUserReport.insert(userReports);*/
					
					/*String allValues = "";
					String sequenceOnly = "";
					
					ArrayList<String> arrayList = new ArrayList<String>(Arrays.asList(output.split("<br/>")));
					
					allValues = arrayList.get(0);
					allValues = allValues + "\n" + arrayList.get(1);
					allValues = allValues + "\n" + arrayList.get(2);
					allValues = allValues + "\n" + arrayList.get(3);
					allValues = allValues + "\n" + arrayList.get(4);
					allValues = allValues + "\n" + arrayList.get(5);
					allValues = allValues + "\n" + arrayList.get(6);
					allValues = allValues + "\n" + arrayList.get(7);
					allValues = allValues + "\n" + arrayList.get(8);
					allValues = allValues + "\n" + arrayList.get(9);
					allValues = allValues + "\n" + arrayList.get(10);
					allValues = allValues + "\n" + arrayList.get(11);
					allValues = allValues + "\n" + arrayList.get(12);
					allValues = allValues + "\n" + arrayList.get(13);
					allValues = allValues + "\n" + arrayList.get(14);
					allValues = allValues + "\n" + arrayList.get(15);
					allValues = allValues + "\n" + arrayList.get(16);
					allValues = allValues + "\n" + arrayList.get(17);
					
					sequenceOnly = arrayList.get(18) + "\n" + arrayList.get(19) + "\n" + arrayList.get(20) + "\n" 
							+ arrayList.get(21) + "\n" + arrayList.get(22) + "\n" + arrayList.get(23) + "\n"
							+ arrayList.get(24) + "\n" + arrayList.get(25) + "\n" + arrayList.get(26) + "\n" 
							+ arrayList.get(27) + "\n" + arrayList.get(28) + "\n" + arrayList.get(29) + "\n"
							+ arrayList.get(30) + "\n" + arrayList.get(31) + "\n" + arrayList.get(32) + "\n" 
							+ arrayList.get(33) + "\n" + arrayList.get(34) + "\n" + arrayList.get(35) + "\n" 
							+ arrayList.get(36) + "\n" + arrayList.get(37) + "\n" + arrayList.get(38);
					
					allValues = allValues + "\n" + arrayList.get(39);
					allValues = allValues + "\n" + arrayList.get(40);
					allValues = allValues + "\n" + arrayList.get(41);
					allValues = allValues + "\n" + arrayList.get(42);
					allValues = allValues + "\n" + arrayList.get(43);
					allValues = allValues + "\n" + arrayList.get(44);
					allValues = allValues + "\n" + arrayList.get(45);
					allValues = allValues + "\n" + arrayList.get(46);
				*/	
					/*response.setMessage("Result Summary: \n" + output + "##**##" + allValues + "##**##" + sequenceOnly + "##**##" + Utils.PATH_SERVER_URL + currentTime + ".pdf" + "##**##" + Utils.PATH_SERVER_URL + currentTime.trim() + "" + outputPrefix + ".unfa" + "##**##" + Utils.PATH_SERVER_URL + currentTime.trim() + "" + outputPrefix + ".unfa");*/
//					response.setMessage("Result Summary: \n" + output + "##**##" + " " + "##**##" + " " + "##**##" + Utils.PATH_SERVER_URL + currentTime + ".pdf");
					
					response.setMessage("Result Summary: \n" + output);
					response.setStatus("SUCCESS");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response, addAccessControllAllowOrigin(), HttpStatus.OK);
				
				/*}
				else
				{
					response.setActor("nameOfFile");
					response.setMessage("ERROR occured while PDF Report Creation");
					response.setStatus("FAILED");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response,
							addAccessControllAllowOrigin(),
							HttpStatus.EXPECTATION_FAILED);
				}*/
			}
			else 
			{
				response.setActor("" + userId);
				response.setMessage("ERROR: user is not registered");
				response.setStatus("Not Found");
				response.setId(-1l);
				entity = new ResponseEntity<JdJsonResponse>(response,
						addAccessControllAllowOrigin(), HttpStatus.UNAUTHORIZED);
			}	
		}
		catch (Exception e) 
		{
			e.printStackTrace();
			response.setActor("");
			response.setMessage("JAVA EXCEPTION: " + e.getMessage()
					+ ".");
			response.setStatus("FAILED");
			response.setId(-1l);
			entity = new ResponseEntity<JdJsonResponse>(response,
					addAccessControllAllowOrigin(),
					HttpStatus.EXPECTATION_FAILED);
		}
		return entity;
	}
}
