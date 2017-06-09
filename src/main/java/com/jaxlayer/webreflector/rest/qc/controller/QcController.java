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

import com.jaxlayer.webreflector.rest.models.FourFiveFourQc;
import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.response.JdJsonResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceFFFQc;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.MultiFolderReading;
import com.jaxlayer.webreflector.resti.utils.Utils;

@Controller
public class QcController {
	@Autowired
	private GsIServiceUser serviceUser;
	@Autowired
	private GsIServiceProcesses serviceProcesses;
	@Autowired
	private GsIServiceFFFQc serviceFFFqc;

	@RequestMapping(value = "/run/qc", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<JdJsonResponse> runQc(
			@RequestParam("projectName") String projectName,

			@RequestParam("l") String l, @RequestParam("s") String s,
			@RequestParam("n") Integer n, @RequestParam("f") String f,
			@RequestParam("m") String m, @RequestParam("cpu") Integer cpu,
			@RequestParam("onlyStat") Boolean onlyStat,

			@RequestParam("t") String t, @RequestParam("z") String z,
			@RequestParam("sequencingLayout") String sequencingLayout,

			@RequestParam("listOfSamples") String listOfFiles,
			@RequestParam("ouputDir") String outputFolder,

			@RequestParam("userId") Long userId) {
		String cmd = "";
		String SampleNames = "";
		String inputString = "";
		boolean flagForSeqLayout = false;

		List<String> listQueryFiles = new ArrayList<String>();
		List<String> onlyNamesOfFile = new ArrayList<String>();
		List<String> listOfAdaptorFiles = new ArrayList<String>();
		MultiFolderReading mf = new MultiFolderReading();
		User user = null;
		JavaRunCommands rcmd = new JavaRunCommands();
		ResponseEntity<JdJsonResponse> entity = null;
		JdJsonResponse response = new JdJsonResponse();

		try {
//			mf.checkFilesPresent( Utils.SCRIPT_DIRECTORY_BIN + "qc/NGSQCToolkit_v2.3.3/QC/454QC.pl".trim()+","+Utils.SORT_SAMPLEWISE_454_FILES.trim());
			
			if (sequencingLayout.equalsIgnoreCase("Single")) {
				flagForSeqLayout = true;
			} else {
				flagForSeqLayout = false;
			}

			user = serviceUser.getUserById(userId);

			if (user != null) {
				if (Runtime.getRuntime().availableProcessors() >= cpu) {
					String[] hashSeperateOutputArr = listOfFiles.split("###");
					hashSeperateOutputArr = checkUniqValues(hashSeperateOutputArr);

					for (int i = 0; i < hashSeperateOutputArr.length; i++) {
						String[] commaSeperatedOutputArr = hashSeperateOutputArr[i]
								.split(";");

						if (SampleNames.length() == 0) {
							SampleNames = commaSeperatedOutputArr[0];
						} else {
							SampleNames = SampleNames + ","
									+ commaSeperatedOutputArr[0];
						}

						// Single End Data

						if (flagForSeqLayout == true) {
							String[] tempArrayForInputFile = commaSeperatedOutputArr[2]
									.split("/");
							String[] tempArrayForQualityFile = commaSeperatedOutputArr[3]
									.split("/");

							// Input Fasta File

							if (!onlyNamesOfFile
									.contains(tempArrayForInputFile[tempArrayForInputFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[2]);

								onlyNamesOfFile
										.add(tempArrayForInputFile[tempArrayForInputFile.length - 1]);
								inputString = inputString + " -i "
										+ commaSeperatedOutputArr[2];
							} else {
								response.setActor("Same File Names: ");
								response.setMessage("* Same File Names...!!\n\nTwo or more files seem to have same file name.\n"
										+ "Please change the file name to prevent overwriting.\n");
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(
										response, HttpStatus.NOT_IMPLEMENTED);

								return entity;

							}

							// First Quality File

							if (!onlyNamesOfFile
									.contains(tempArrayForQualityFile[tempArrayForQualityFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[3]);

								onlyNamesOfFile
										.add(tempArrayForQualityFile[tempArrayForQualityFile.length - 1]);
								inputString = inputString + " "
										+ commaSeperatedOutputArr[3];
							} else {
								response.setActor("Same File Names: ");
								response.setMessage("* Same File Names...!!\n\nTwo or more files seem to have same file name.\n"
										+ "Please change the file name to prevent overwriting.\n");
								response.setStatus("FAILED");
								response.setId(-1l);
								entity = new ResponseEntity<JdJsonResponse>(
										response, HttpStatus.NOT_IMPLEMENTED);

								return entity;

							}
							inputString = inputString + " "
									+ commaSeperatedOutputArr[1];
							listOfAdaptorFiles.add(commaSeperatedOutputArr[1]);
						}

						// Paired End Data

						else {
							String[] tempArrayForFirstInputFile = commaSeperatedOutputArr[2]
									.split("/");
							String[] tempArrayForFirstQualityFile = commaSeperatedOutputArr[3]
									.split("/");
							String[] tempArrayForSecondInputFile = commaSeperatedOutputArr[4]
									.split("/");
							String[] tempArrayForSecondQualityFile = commaSeperatedOutputArr[5]
									.split("/");

							// First Input Fasta File

							if (!onlyNamesOfFile
									.contains(tempArrayForFirstInputFile[tempArrayForFirstInputFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[2]);

								onlyNamesOfFile
										.add(tempArrayForFirstInputFile[tempArrayForFirstInputFile.length - 1]);
								inputString = inputString + " -i "
										+ commaSeperatedOutputArr[2];
							} else {
								commaSeperatedOutputArr[2].trim();

								File file = new File(commaSeperatedOutputArr[2]);
								File file2 = new File(
										commaSeperatedOutputArr[2]
												+ "_RenamedBySQIT" + i);

								boolean success = file.renameTo(file2);

								if (!success) {
									response.setActor("" + userId);
									response.setMessage("file can not renamed, in response to remove same file names...!!");
									response.setStatus("Error in input file name.");
									response.setId(-1l);
									entity = new ResponseEntity<JdJsonResponse>(
											response,
											addAccessControllAllowOrigin(),
											HttpStatus.EXPECTATION_FAILED);
								} else {
									listQueryFiles
											.add(commaSeperatedOutputArr[2]
													+ "_RenamedBySQIT" + i);

									onlyNamesOfFile
											.add(tempArrayForFirstInputFile[tempArrayForFirstInputFile.length - 1]
													+ "_RenamedBySQIT" + i);
									inputString = inputString + " "
											+ commaSeperatedOutputArr[2]
											+ "_RenamedBySQIT" + i;
								}
							}

							// First Quality File

							if (!onlyNamesOfFile
									.contains(tempArrayForFirstQualityFile[tempArrayForFirstQualityFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[3]);

								onlyNamesOfFile
										.add(tempArrayForFirstQualityFile[tempArrayForFirstQualityFile.length - 1]);
								inputString = inputString + " -i "
										+ commaSeperatedOutputArr[3];
							} else {
								commaSeperatedOutputArr[3].trim();

								File file = new File(commaSeperatedOutputArr[3]);
								File file2 = new File(
										commaSeperatedOutputArr[3]
												+ "_RenamedBySQIT" + i);

								boolean success = file.renameTo(file2);

								if (!success) {
									response.setActor("" + userId);
									response.setMessage("file can not renamed, in response to remove same file names...!!");
									response.setStatus("Error in input file name.");
									response.setId(-1l);
									entity = new ResponseEntity<JdJsonResponse>(
											response,
											addAccessControllAllowOrigin(),
											HttpStatus.EXPECTATION_FAILED);
								} else {
									listQueryFiles
											.add(commaSeperatedOutputArr[3]
													+ "_RenamedBySQIT" + i);

									onlyNamesOfFile
											.add(tempArrayForFirstQualityFile[tempArrayForFirstQualityFile.length - 1]
													+ "_RenamedBySQIT" + i);
									inputString = inputString + " "
											+ commaSeperatedOutputArr[3]
											+ "_RenamedBySQIT" + i;
								}
							}
							inputString = inputString + " "
									+ commaSeperatedOutputArr[1];

							// Second input fasta File

							if (!onlyNamesOfFile
									.contains(tempArrayForSecondInputFile[tempArrayForSecondInputFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[4]);

								onlyNamesOfFile
										.add(tempArrayForSecondInputFile[tempArrayForSecondInputFile.length - 1]);
								inputString = inputString + " -i "
										+ commaSeperatedOutputArr[4];
							} else {
								commaSeperatedOutputArr[4].trim();

								File file = new File(commaSeperatedOutputArr[4]);
								File file2 = new File(
										commaSeperatedOutputArr[4]
												+ "_RenamedBySQIT" + i);

								boolean success = file.renameTo(file2);

								if (!success) {
									response.setActor("" + userId);
									response.setMessage("file can not renamed, in response to remove same file names...!!");
									response.setStatus("Error in input file name.");
									response.setId(-1l);
									entity = new ResponseEntity<JdJsonResponse>(
											response,
											addAccessControllAllowOrigin(),
											HttpStatus.EXPECTATION_FAILED);
								} else {
									listQueryFiles
											.add(commaSeperatedOutputArr[4]
													+ "_RenamedBySQIT" + i);

									onlyNamesOfFile
											.add(tempArrayForSecondInputFile[tempArrayForSecondInputFile.length - 1]
													+ "_RenamedBySQIT" + i);
									inputString = inputString + " "
											+ commaSeperatedOutputArr[4]
											+ "_RenamedBySQIT" + i;
								}
							}

							// Second quality File

							if (!onlyNamesOfFile
									.contains(tempArrayForSecondQualityFile[tempArrayForSecondQualityFile.length - 1])) {
								listQueryFiles.add(commaSeperatedOutputArr[5]);

								onlyNamesOfFile
										.add(tempArrayForSecondQualityFile[tempArrayForSecondQualityFile.length - 1]);
								inputString = inputString + " -i "
										+ commaSeperatedOutputArr[5];
							} else {
								commaSeperatedOutputArr[5].trim();

								File file = new File(commaSeperatedOutputArr[5]);
								File file2 = new File(
										commaSeperatedOutputArr[5]
												+ "_RenamedBySQIT" + i);

								boolean success = file.renameTo(file2);

								if (!success) {
									response.setActor("" + userId);
									response.setMessage("file can not renamed, in response to remove same file names...!!");
									response.setStatus("Error in input file name.");
									response.setId(-1l);
									entity = new ResponseEntity<JdJsonResponse>(
											response,
											addAccessControllAllowOrigin(),
											HttpStatus.EXPECTATION_FAILED);
								} else {
									listQueryFiles
											.add(commaSeperatedOutputArr[5]
													+ "_RenamedBySQIT" + i);

									onlyNamesOfFile
											.add(tempArrayForSecondQualityFile[tempArrayForSecondQualityFile.length - 1]
													+ "_RenamedBySQIT" + i);
									inputString = inputString + " "
											+ commaSeperatedOutputArr[5]
											+ "_RenamedBySQIT" + i;
								}
							}
							inputString = inputString + " "
									+ commaSeperatedOutputArr[1];
						}
					}

					// serverQuery = serverQuery + " -i " + fastaFiles + " " +
					// qualFile + " " + adaptorOptions;

					if (onlyStat) {
						cmd = Utils.QC_INSTALLATION_PATH + inputString + " -c "
								+ cpu + " -onlyStat" + " -l " + l + " -s " + s
								+ " -n " + n + " -m " + m + " -f " + f + " -t "
								+ t + " -z " + z + " -o " + outputFolder;
					} else {
						cmd = Utils.QC_INSTALLATION_PATH + inputString + " -c "
								+ cpu + " -l " + l + " -s " + s + " -n " + n
								+ " -m " + m + " -f " + f + " -t " + t + " -z "
								+ z + " -o " + outputFolder;
					}

					FourFiveFourQc fffqc = new FourFiveFourQc();
					fffqc.setL("" + l);
					fffqc.setF("" + f);
					fffqc.setM("" + m);
					fffqc.setN("" + n);
					fffqc.setO("" + outputFolder);
					fffqc.setS("" + s);
					fffqc.setT("" + t);
					fffqc.setZ("" + z);
					fffqc.setProjectName("" + projectName);
					fffqc.setSamples(SampleNames);
					fffqc.setListOfInputFile(listQueryFiles);

					Processes processes = new Processes();
					processes.setProcessName(projectName + "_454Qc");
					processes.setNextProcesses("FourFiveFourQcReport");
					processes.setProcessType("FourFiveFourQc");
					fffqc.setProcesses(processes);
					serviceFFFqc.insert(fffqc);
					processes.setProcessesTypeId(fffqc.getFourFiveFourQcId());

					String output = rcmd.executeCommandAllUser(cmd, user,
							serviceProcesses, processes);
					System.out.println(cmd);

					// Sorting
					String[] tempSampleName = SampleNames.split(",");
//					if (tempSampleName.length > 1) {
						StringBuilder sb = new StringBuilder();
						for (String str : onlyNamesOfFile) {
							sb.append(str);
							sb.append(",");
						}

						String command = Utils.SORT_SAMPLEWISE_454_FILES
								+ sb.toString() + " " + SampleNames + " "
								+ outputFolder;
						System.out.println(command);
						rcmd.executeCommandOnlyForBact(command);
//					}

					response.setActor(cmd);
					response.setMessage(output);
					response.setStatus("SUCCESS");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response,
							addAccessControllAllowOrigin(), HttpStatus.OK);
				} else {
					response.setActor(cmd);
					response.setMessage("CPU must be less than "
							+ Runtime.getRuntime().availableProcessors());
					response.setStatus("FAILED");
					response.setId(-1l);
					entity = new ResponseEntity<JdJsonResponse>(response,
							addAccessControllAllowOrigin(),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				response.setActor("" + userId);
				response.setMessage("user is not registered");
				response.setStatus("Not Found");
				response.setId(-1l);
				entity = new ResponseEntity<JdJsonResponse>(response,
						addAccessControllAllowOrigin(), HttpStatus.UNAUTHORIZED);
			}
		} catch (Exception e) {
			response.setActor(cmd);
			response.setMessage(e.getMessage());
			response.setStatus("FAILED");
			response.setId(-1l);
			entity = new ResponseEntity<JdJsonResponse>(response,
					addAccessControllAllowOrigin(),
					HttpStatus.EXPECTATION_FAILED);
		}
		return entity;
	}

	// Making Unique array

	public static String[] checkUniqValues(String[] inputArray) {
		List<String> uq = new ArrayList<String>();
		HashMap<Integer, String> hmapForReturnValue = new HashMap<Integer, String>();
		HashMap<Integer, String> hmapForUniqueValue = new HashMap<Integer, String>();

		for (int i = 0; i < inputArray.length; i++) {
			String[] commaSeperatedTempArr = inputArray[i].split(";");

			if (commaSeperatedTempArr[1].equalsIgnoreCase("Paired")) {
				hmapForReturnValue.put(i, inputArray[i]);
				hmapForUniqueValue.put(i, commaSeperatedTempArr[2] + ";"
						+ commaSeperatedTempArr[3]);
			} else {
				hmapForReturnValue.put(i, inputArray[i]);
				hmapForUniqueValue.put(i, commaSeperatedTempArr[2]);
			}
		}
		Collection<String> list = hmapForUniqueValue.values();
		for (Iterator<String> itr = list.iterator(); itr.hasNext();) {
			if (Collections.frequency(list, itr.next()) > 1) {
				itr.remove();
			}
		}
		Set set = hmapForUniqueValue.entrySet();
		Iterator iterator = set.iterator();

		while (iterator.hasNext()) {
			Map.Entry mentry = (Map.Entry) iterator.next();
			String value = (String) hmapForReturnValue.get(mentry.getKey());

			uq.add(value);
		}
		String[] stockArr = new String[uq.size()];
		stockArr = uq.toArray(stockArr);
		return stockArr;
	}
}