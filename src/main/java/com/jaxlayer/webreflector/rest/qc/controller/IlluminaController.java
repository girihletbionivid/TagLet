package com.jaxlayer.webreflector.rest.qc.controller;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.jaxlayer.webreflector.rest.models.IlluminaQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.response.JdJsonResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceIlluminaQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.MultiFolderReading;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class IlluminaController {
	@Autowired
	private GsIServiceUser serviceUser;
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private GsIServiceIlluminaQc serviceIlluminaQc;

	@RequestMapping(value = "/run/illuminax", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<JdJsonResponse> runIlluminax
	(
			@RequestParam("projectName") String projectName,

			@RequestParam("l") String l,
			@RequestParam("s") String s,
			
			@RequestParam("cpu") Long cpu,
			@RequestParam("onlyStat") Boolean onlyStat,			
			@RequestParam("t") String t, 
			@RequestParam("z") String z,
			
			@RequestParam("listOfSamples") String listOfFiles,

			@RequestParam("outputFolder") String outputFolder,
			@RequestParam("userId") Long userId
		)
			
	{
		String cmd = "";
		String SampleNames = "";
		String readLayout = "";
		String inputString = "";
		List<String> listAdapterFiles = new ArrayList<String>();
		List<String> listQueryFiles = new ArrayList<String>();
		List<String> onlyNamesOfFile = new ArrayList<String>();
		List<String> listFastqVarient = new ArrayList<String>();
		MultiFolderReading mf = new MultiFolderReading();
		String singleFiles="";
		String leftFiles="";
		String rightFiles="";
		String adapterFiles="";
		String variants="";
		
		User user = null;
		ResponseEntity<JdJsonResponse> entity = null;
		JdJsonResponse response = new JdJsonResponse();
	
		try 
		{
			user = serviceUser.getUserById(userId);
//			mf.checkFilesPresent( Utils.SCRIPT_DIRECTORY_BIN+ "qc/NGSQCToolkit_v2.3.3/QC/IlluQC_PRLL.pl".trim()+","+Utils.SCRIPT_DIRECTORY_BIN + "qc/sortFilesForIllumina.pl".trim());
			if (user != null)
			{
				if (Runtime.getRuntime().availableProcessors() >= cpu) 
				{
					String [] hashSeperateOutputArr = listOfFiles.split("###");
//					hashSeperateOutputArr = checkUniqValues(hashSeperateOutputArr);
					
					for (int i = 0; i < hashSeperateOutputArr.length; i++) 
					{
						String [] commaSeperatedOutputArr = hashSeperateOutputArr[i].split(";");
						
						if( SampleNames.length() == 0 )
						{
							SampleNames = commaSeperatedOutputArr[0];
						}
						else
						{
							SampleNames = SampleNames + "," + commaSeperatedOutputArr[0];
						}
						
						if(commaSeperatedOutputArr[1].equalsIgnoreCase("Paired"))
						{
							if(inputString.length() == 0)
							{
								inputString = "-pe";
								readLayout = commaSeperatedOutputArr[1]; 
							}
							else
							{
								inputString = inputString + " -pe";
								readLayout = readLayout + "," + commaSeperatedOutputArr[1];
							}

							String [] tempArray = commaSeperatedOutputArr[2].split("/");
							
//							if(!onlyNamesOfFile.contains(tempArray[tempArray.length - 1]))
//							{
								listQueryFiles.add(commaSeperatedOutputArr[2]);
								
								onlyNamesOfFile.add(tempArray[tempArray.length - 1]);
								inputString = inputString + " " + commaSeperatedOutputArr[2];
								mf.checkFilesPresent(commaSeperatedOutputArr[2].trim());
								if(leftFiles.equals(""))
									leftFiles=commaSeperatedOutputArr[2];
								else
									leftFiles=leftFiles+","+commaSeperatedOutputArr[2];
//							}
							/*else
							{
								response.setActor("Same File Names: ");
								response.setMessage("* Same File Names...!!\n\nTwo or more files seem to have same file name.\n" 
													+ "Please change the file name to prevent overwriting.\n");
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(response, HttpStatus.NOT_IMPLEMENTED);
								
								return entity;
							
							}*/
							
							tempArray= commaSeperatedOutputArr[3].split("/");
							
							if(!onlyNamesOfFile.contains(tempArray[tempArray.length - 1]))
							{
								listQueryFiles.add(commaSeperatedOutputArr[3]);
								
								onlyNamesOfFile.add(tempArray[tempArray.length - 1]);
								inputString = inputString + " " + commaSeperatedOutputArr[3];
								mf.checkFilesPresent(commaSeperatedOutputArr[3].trim());
								if(rightFiles.equals(""))
									rightFiles=commaSeperatedOutputArr[3];
								else
									rightFiles=rightFiles+","+commaSeperatedOutputArr[3];
							}
							else
							{
								response.setActor("Same File Names: ");
								response.setMessage("* Same File Names...!!\n\nTwo or more files seem to have same file name.\n" 
													+ "Please change the file name to prevent overwriting.\n");
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(response, HttpStatus.NOT_IMPLEMENTED);
								
								return entity;
							}
							
							if(adapterFiles.equals(""))
								adapterFiles=commaSeperatedOutputArr[4];
							else
								adapterFiles=adapterFiles+","+commaSeperatedOutputArr[4];
							
							if(variants.equals(""))
								variants=commaSeperatedOutputArr[5];
							else
								variants=variants+","+commaSeperatedOutputArr[5];
							
							inputString = inputString + " " + commaSeperatedOutputArr[4];
							inputString = inputString + " " + commaSeperatedOutputArr[5];
							listAdapterFiles.add(commaSeperatedOutputArr[4]);
							listFastqVarient.add(commaSeperatedOutputArr[5]);
						}
						else if(commaSeperatedOutputArr[1].equalsIgnoreCase("Single"))
						{
							if(inputString.length() == 0)
							{
								inputString = "-se";
								readLayout = commaSeperatedOutputArr[1];
							}
							else
							{
								inputString = inputString + " -se";
								readLayout = readLayout + "," + commaSeperatedOutputArr[1];
							}

							String [] tempArray= commaSeperatedOutputArr[2].split("/");
								
//							if(!onlyNamesOfFile.contains(tempArray[tempArray.length - 1]))
//							{
								listQueryFiles.add(commaSeperatedOutputArr[2]);
								
								onlyNamesOfFile.add(tempArray[tempArray.length - 1]);
								inputString = inputString + " " + commaSeperatedOutputArr[2];
								mf.checkFilesPresent(commaSeperatedOutputArr[2].trim());
								if(singleFiles.equals(""))
									singleFiles=commaSeperatedOutputArr[2];
								else
									singleFiles=singleFiles+","+commaSeperatedOutputArr[2];
//							}
//							else
//							{
//								response.setActor("Same File Names: ");
//								response.setMessage("* Same File Names...!!\n\nTwo or more files seem to have same file name.\n" 
//													+ "Please change the file name to prevent overwriting.\n");
//								response.setStatus("FAILED");
//								response.setId(-1l);
//								entity = new ResponseEntity<JdJsonResponse>(response, HttpStatus.NOT_IMPLEMENTED);
//								
//								return entity;
/*
								commaSeperatedOutputArr[2].trim();
								
								File file = new File(commaSeperatedOutputArr[2]);
								File file2 = new File(commaSeperatedOutputArr[2] + "_RenamedBySQIT" + i);

								boolean success = file.renameTo(file2);
								if (!success)
								{
									response.setActor("" + userId);
									response.setMessage("file can not renamed, in response to remove same file names...!!");
									response.setStatus("Error in input file name.");
									response.setId(-1l);
									entity = new ResponseEntity<JdJsonResponse>(response, addAccessControllAllowOrigin(), HttpStatus.EXPECTATION_FAILED);
								}
								else
								{
									listQueryFiles.add(commaSeperatedOutputArr[2] + "_RenamedBySQIT" + i);
									
									onlyNamesOfFile.add(tempArray[tempArray.length - 1] + "_RenamedBySQIT" + i);
									inputString = inputString + " " + commaSeperatedOutputArr[2] + "_RenamedBySQIT" + i;
								}
							}
*/							
							
							if(adapterFiles.equals(""))
								adapterFiles=commaSeperatedOutputArr[3];
							else
								adapterFiles=adapterFiles+","+commaSeperatedOutputArr[3];
							
							if(variants.equals(""))
								variants=commaSeperatedOutputArr[4];
							else
								variants=variants+","+commaSeperatedOutputArr[4];
							inputString = inputString + " " + commaSeperatedOutputArr[3];
							inputString = inputString + " " + commaSeperatedOutputArr[4];
							
							listAdapterFiles.add(commaSeperatedOutputArr[3]);
							listFastqVarient.add(commaSeperatedOutputArr[4]);
						}
					}
					
					if (onlyStat) 
					{
						cmd = Utils.QC_ILLUMINA_INSTALLATION_PATH
									+ inputString + " -l " + l + " -s " + s
									+ " -onlyStat " + " -t " + t + " -z " + z
									+ " -c " + cpu + " -o " + outputFolder;
					}
					else 
					{
							cmd = Utils.QC_ILLUMINA_INSTALLATION_PATH
									+ inputString + " -l " + l + " -s " + s
									+ " -t " + t + " -z " + z + " -c " + cpu
									+ " -o " + outputFolder;
					}
					
					IlluminaQc illuminaQc = new IlluminaQc();
					illuminaQc.setCpu(cpu);
					illuminaQc.setL(l);
					illuminaQc.setS(s);
					illuminaQc.setT(t);
					illuminaQc.setZ(z);
					illuminaQc.setSingleFiles(singleFiles);
					illuminaQc.setLeftFiles(leftFiles);
					illuminaQc.setRightFiles(rightFiles);
					illuminaQc.setAdapterFiles(adapterFiles);
					illuminaQc.setSamples(SampleNames);
					illuminaQc.setVariants(variants);
					
				//	illuminaQc.setQueryAdapterFiles(listAdapterFiles);
				//	illuminaQc.setQueryFiles(listQueryFiles);
					
					illuminaQc.setOutputFolder(outputFolder);
					illuminaQc.setOnstat(onlyStat);
					illuminaQc.setSequenceType("fastq");
					illuminaQc.setReadLayout(readLayout);
					
					JavaRunCommands rcmd = new JavaRunCommands();
					Processes processes = new Processes();
					processes.setProcessName("Illumina QC");
					processes.setUser(user);
					processes.setProcessType("IlluminaQc");
					processes.setProjectName(projectName);
					illuminaQc.setProcesses(processes);
					illuminaQc.setProjectName(projectName);
					serviceIlluminaQc.insert(illuminaQc);
					processes.setProcessesTypeId(illuminaQc.getIlluminaQcId());
					processes.setNextProcesses("illumina_report");
					
					System.out.println("*****Command: " + cmd);
					String output = rcmd.executeCommandAllUser(cmd, user,serviceProcesses, processes);
					
//					Sorting Files
					String [] tempSampleName = SampleNames.split(",");
					
//					if( tempSampleName.length > 1 )
//					{
						StringBuilder sb = new StringBuilder();
						for (String str : onlyNamesOfFile)
						{
						    sb.append(str);
						    sb.append(",");
						}
						
						String command = Utils.SORT_SAMPLEWISE_ILLUMINA_FILES
										+ sb.toString() + " " + readLayout + " " + SampleNames + " " + outputFolder;
						
						System.out.println("*****Command: " + command);
						rcmd.executeCommandOnlyForBact(command);
//					}
					
					response.setActor(cmd);
					response.setMessage(output);
					response.setStatus("SUCCESS");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response,addAccessControllAllowOrigin(), HttpStatus.OK);
				}
				else 
				{
					response.setActor(cmd);
					response.setMessage("CPU must be less than " + Runtime.getRuntime().availableProcessors());
					response.setStatus("FAILED");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response, addAccessControllAllowOrigin(), HttpStatus.BAD_REQUEST);
				}
			} 
			else 
			{
				response.setActor("" + userId);
				response.setMessage("user is not registered");
				response.setStatus("Not Found");
				response.setId(-1l);
				entity = new ResponseEntity<JdJsonResponse>(response, addAccessControllAllowOrigin(), HttpStatus.UNAUTHORIZED);
			}
		} 
		catch (Exception e) 
		{
			response.setActor(cmd);
			response.setMessage(e.getMessage());
			response.setStatus("FAILED");
			response.setId(-1l);
			entity = new ResponseEntity<JdJsonResponse>(response, addAccessControllAllowOrigin(), HttpStatus.EXPECTATION_FAILED);
		}
		return entity;
	}
	
//	Making Unique array
	
	public static String[] checkUniqValues(String [] inputArray)
	{
		List<String> tempList = new ArrayList<String>();
		List<String> returnList = new ArrayList<String>();
		List<String> uq = new ArrayList<String>();
		
		HashMap<Integer, String> hmapForReturnValue = new HashMap<Integer, String>();
		HashMap<Integer, String> hmapForUniqueValue = new HashMap<Integer, String>();
		
		for (int i = 0; i < inputArray.length; i++) 
		{
			String [] commaSeperatedTempArr = inputArray[i].split(";");
			
			if(commaSeperatedTempArr[1].equalsIgnoreCase("Paired"))
			{
				hmapForReturnValue.put(i, inputArray[i]);
				hmapForUniqueValue.put(i, commaSeperatedTempArr[2] + ";" + commaSeperatedTempArr[3]);
			}
			else
			{
				hmapForReturnValue.put(i, inputArray[i]);
				hmapForUniqueValue.put(i, commaSeperatedTempArr[2]);
			}
		}
		Collection<String> list = hmapForUniqueValue.values();
		for(Iterator<String> itr = list.iterator(); itr.hasNext();)
		{
			if(Collections.frequency(list, itr.next())>1)
		    {
				itr.remove();
		    }
		}
		Set set = hmapForUniqueValue.entrySet();
	    Iterator iterator = set.iterator();
	    
	    while(iterator.hasNext())
	    {
	    	Map.Entry mentry = (Map.Entry)iterator.next();
	    	String value = (String) hmapForReturnValue.get(mentry.getKey());
	    	
	    	uq.add(value);
	    }
	    String[] stockArr = new String[uq.size()];
	    stockArr = uq.toArray(stockArr);
	    return stockArr;
	}
}
