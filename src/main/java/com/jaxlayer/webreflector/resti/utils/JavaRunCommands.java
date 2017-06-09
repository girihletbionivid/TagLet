package com.jaxlayer.webreflector.resti.utils;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.text.DecimalFormat;
import java.util.List;
import java.util.UUID;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import com.jaxlayer.webreflector.rest.models.Processes;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.service.GsIServiceProcesses;

public class JavaRunCommands {
	public String executeCommandAll(String command) {

		StringBuffer output = new StringBuffer();

		try {
			Process p = Runtime.getRuntime().exec(command);
			Field f = p.getClass().getDeclaredField("pid");
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			f.setAccessible(true);

			String y = "";

			while ((y = reader.readLine()) != null) {
				output.append(y + "<br/>");
				y = "";
			}
			p.waitFor();
			if (p.exitValue() == 0) {
				System.out.println("Command Successful" + p.exitValue());
			} else {
				/*System.out.println(p.exitValue() + "Command Failure"
						+ p.getErrorStream().toString());*/
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
//		System.out.println(output);
		
		return output.toString();

	}
	public String executeCommandAllUser(String command, User user,
			GsIServiceProcesses serviceProcesses, Processes processes)
			throws Exception {

		int pid;
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);
		Field f = p.getClass().getDeclaredField("pid");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		f.setAccessible(true);
		pid = f.getInt(p);

		processes.setPID(Long.parseLong("" + pid));
		processes.setProcessEndTime("Pending");
		processes.setProcessStartTime("" + System.currentTimeMillis());
		processes.setProcessStatus("Running");
		processes.setProcessCmd(command);
		processes.setUser(user);

		processes.setProcessLog("");
//		System.out.println("inserting==>" + processes.toString());
		serviceProcesses.update(processes);
		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "<br/>");
			if (y.contains("uparse_step")) {

//				System.out.println("==================io===========" + y);
				String[] parts = command.split(" ");
				if (parts.length > 14)
					command = command.replace(parts[14], "");
				processes.setProcessCmd(command + " " + y);
				processes.setNextProcesses("resume " + y);
			}
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";
		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "<br/>");
			if (y1.contains("uparse_step")) {

				String[] parts = command.split(" ");
				if (parts.length > 14)
					command = command.replace(parts[14], "");
				processes.setProcessCmd(command + y1);
				processes.setNextProcesses("resume " + y1);

			}
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) 
		{
//			writeInLog("\n" + command + "\n");
			// System.out.println("Command Successful==>" + p.exitValue());
			processes.setProcessStatus("Completed");
			processes.setProcessLog(output.toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			serviceProcesses.update(processes);
		} else {
			processes.setProcessStatus("Error");
			processes.setProcessLog(output.toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			serviceProcesses.update(processes);
			/*
			 * System.out.println(p.exitValue() + "==>" + command +
			 * "<==Command Failure" + p.getErrorStream().toString());
			 */
			StringBuffer m = new StringBuffer();

			writeInLog("\n" + command + "\n" + "Reason==>\n" + output + "\n");
			m.append("" + command + "==>");
			output.append(p.getErrorStream().toString());
			output = m.append(output);

		}
		return output.toString();
	}
	
	public String executeCommandAllUserForTagLet(String command, String downloadPath, String serverPath, User user,
			GsIServiceProcesses serviceProcesses, Processes processes)
			throws Exception {

		int pid;
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);
		Field f = p.getClass().getDeclaredField("pid");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		f.setAccessible(true);
		pid = f.getInt(p);

		processes.setPID(Long.parseLong("" + pid));
		processes.setProcessEndTime("Pending");
		processes.setProcessStartTime("" + System.currentTimeMillis());
		processes.setProcessStatus("Running");
		processes.setProcessCmd(command);
		processes.setUser(user);
		processes.setReportPathToDownload("");
		processes.setReportPathToServer("");
		processes.setProcessLog("");
		
//		System.out.println("inserting==>" + processes.toString());
		serviceProcesses.update(processes);
		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "<br/>");
			if (y.contains("uparse_step")) {

//				System.out.println("==================io===========" + y);
				String[] parts = command.split(" ");
				if (parts.length > 14)
					command = command.replace(parts[14], "");
				processes.setProcessCmd(command + " " + y);
				processes.setNextProcesses("resume " + y);
			}
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";
		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "<br/>");
			if (y1.contains("uparse_step")) {

				String[] parts = command.split(" ");
				if (parts.length > 14)
					command = command.replace(parts[14], "");
				processes.setProcessCmd(command + y1);
				processes.setNextProcesses("resume " + y1);

			}
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) 
		{
			processes.setProcessStatus("Completed");
			processes.setProcessLog(output.toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			processes.setReportPathToDownload(downloadPath);
			processes.setReportPathToServer(serverPath);
			serviceProcesses.update(processes);
		} 
		else 
		{
			processes.setProcessStatus("Error");
			processes.setProcessLog(output.toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			serviceProcesses.update(processes);
			processes.setReportPathToDownload("");
			processes.setReportPathToServer("");
			StringBuffer m = new StringBuffer();

//			writeInLog("\n" + command + "\n" + "Reason==>\n" + output + "\n");
			m.append("" + command + "==>");
			output.append(p.getErrorStream().toString());
			output = m.append(output);
		}
		return output.toString();
	}
	
	public Boolean isExecuteCommand(String command) throws Exception {
		StringBuffer output = new StringBuffer();
		Boolean flag = false;

		Process p = Runtime.getRuntime().exec(command);
		Field f = p.getClass().getDeclaredField("pid");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		f.setAccessible(true);
		f.getInt(p);

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "<br/>");
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) 
		{
			output.append(y1 + "<br/>");
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) 
		{
			writeInLog("Command Successful==>\n" + command + "\n");
			flag = true;
		} 
		else 
		{
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");

			flag = false;
		}
		return flag;
	}

	public String executeCommandAllWithError(String command, User user,
			GsIServiceProcesses serviceProcesses, Processes processes)
			throws Exception {
		writeInLog(command);
		StringBuffer output = new StringBuffer();
		int pid;
		Process p = Runtime.getRuntime().exec(command);
		Field f = p.getClass().getDeclaredField("pid");
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));
		f.setAccessible(true);
		pid = f.getInt(p);

		processes.setPID(Long.parseLong("" + pid));
		processes.setProcessEndTime("Pending");
		processes.setProcessStartTime("" + System.currentTimeMillis());
		processes.setProcessStatus("Running");
		processes.setUser(user);
		processes.setProcessCmd("" + command);
		processes.setProcessLog("");
		user.getListOfProcess().add(processes);
//		System.out.println("insertingsss==>" + processes.toString());
		serviceProcesses.insert(processes);
		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "<br/>");
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "<br/>");
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) {
			writeInLog("Command Successful==>\n" + command + "\n");
			/* System.out.println("Command Successful" + p.exitValue()); */
			processes.setProcessStatus("Completed");
			processes.setProcessLog(output.toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			serviceProcesses.update(processes);
		} else {
			/*
			 * System.out.println(p.exitValue() + "Command Failure" +
			 * p.getErrorStream().toString());
			 */
			processes.setProcessStatus("Error");
			processes.setProcessLog("" + p.getErrorStream().toString());
			processes.setProcessEndTime("" + System.currentTimeMillis());
			serviceProcesses.update(processes);
			/*
			 * System.out.println(p.exitValue() + "Errror occured==>" + command
			 * + "<==Command Failure" + p.getErrorStream().toString());
			 */

			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
		}
		return output.toString();

	}

	public String executeCommandWithErrorWithoutHistory(String command)
			throws Exception {
		writeInLog(command);
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "<br/>");
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "<br/>");
			y1 = "";
		}
		p.waitFor();

		if (p.exitValue() == 0) {
			/* System.out.println("Command Successful" + p.exitValue()); */
			writeInLog("Command Successful==>\n" + command + "\n");
		} else {
			/*
			 * System.out.println(p.exitValue() + "Command Failure" +
			 * p.getErrorStream().toString());
			 */
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
		}
		return output.toString();
	}

	public String executeCommandWithErrorWithoutHistoryForDeseq(String command)
			throws Exception {
		writeInLog(command);
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y);
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "<br/>");
			y1 = "";
		}
		p.waitFor();

		if (p.exitValue() == 0) {
			/* System.out.println("Command Successful" + p.exitValue()); */
			writeInLog("Command Successful==>\n" + command + "\n");
		} else {
			/*
			 * System.out.println(p.exitValue() + "Command Failure" +
			 * p.getErrorStream().toString());
			 */
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
		}
		return output.toString();
	}

	
	public String executeCommandAllUserForBact(String command, User user,
			GsIServiceProcesses serviceProcesses, Processes processes) {
		int pid;
		StringBuffer output = new StringBuffer();

		try {
			Process p = Runtime.getRuntime().exec(command);
			Field f = p.getClass().getDeclaredField("pid");
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			f.setAccessible(true);
			pid = f.getInt(p);

			processes.setPID(Long.parseLong("" + pid));
			processes.setProcessEndTime("Pending");
			processes.setProcessStartTime("" + System.currentTimeMillis());
			processes.setProcessStatus("Running");
			processes.setUser(user);
			processes.setProcessCmd("" + command);
			processes.setProcessLog("");
//			System.out.println("inserting==>" + processes.toString());
			serviceProcesses.update(processes);
			String y = "";

			while ((y = reader.readLine()) != null) {
				output.append(y + "\n");
				y = "";
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));
			String y1 = "Command Failure==>" + command + "==>";

			while ((y1 = reader1.readLine()) != null) {
				output.append(y1 + "\n");
				y1 = "";
			}

			p.waitFor();
			
			if (p.exitValue() == 0) {
				System.out.println("Command Successful" + p.exitValue());
				processes.setProcessStatus("Completed");
				processes.setProcessLog(output.toString());
				processes.setProcessEndTime("" + System.currentTimeMillis());
				serviceProcesses.update(processes);
			} else {
				processes.setProcessStatus("Error");
				processes.setProcessLog("" + p.getErrorStream().toString());
				processes.setProcessEndTime("" + System.currentTimeMillis());
				serviceProcesses.update(processes);
				/*System.out.println(p.exitValue() + "==>" + command
						+ "<==Command Failure" + p.getErrorStream().toString());*/
				StringBuffer m = new StringBuffer();
				m.append("Command Failure==>" + command + "==>");
				output = m.append(output);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return output.toString();
	}

	/*
	 * 
	 * End
	 */
	public String executeCommandOnlyForBactWithLog(String command) throws Exception {
		writeInLog(command);
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "\n");
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "\n");
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) {
			writeInLog("Command Successful==>\n" + command + "\n");
			StringBuffer m = new StringBuffer();
			m.append("Command Successful==>" + command + "==>");
			output = m.append(output);
			/* System.out.println("Command Successful" + p.exitValue()); */
		} else {
			/*
			 * System.out.println(p.exitValue() + "Command Failure" +
			 * p.getErrorStream().toString());
			 */
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
			
			
			StringBuffer m = new StringBuffer();
			m.append("Command Failure==>" + command + "==>");
			output = m.append(output);
		}
		return output.toString();

	}
	public String executeCommandOnlyForBact(String command) throws Exception {
		writeInLog(command);
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y + "\n");
			y = "";
		}

		BufferedReader reader1 = new BufferedReader(new InputStreamReader(
				p.getErrorStream()));
		String y1 = "";

		while ((y1 = reader1.readLine()) != null) {
			output.append(y1 + "\n");
			y1 = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) {
			writeInLog("Command Successful==>\n" + command + "\n");
		
			/* System.out.println("Command Successful" + p.exitValue()); */
		} else {
			/*
			 * System.out.println(p.exitValue() + "Command Failure" +
			 * p.getErrorStream().toString());
			 */
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
		}
		return output.toString();

	}
	public String executeCommandOnly(String command) throws Exception {
		writeInLog(command);

		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y);
			y = "";
		}
		p.waitFor();

		if (p.exitValue() == 0) {
			writeInLog("Command Successful==>\n" + command + "\n");
		} else {
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
		}
		return output.toString();

	}

	public Boolean executeCommandOnlyKill(Long pid,
			GsIServiceProcesses serviceProcesses) throws Exception {
		writeInLog("kill " + pid);
		Boolean flag = false;
		String command = "kill " + pid;
		StringBuffer output = new StringBuffer();

		Process p = Runtime.getRuntime().exec(command);

		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));

		String y = "";

		while ((y = reader.readLine()) != null) {
			output.append(y);
			y = "";
		}
		p.waitFor();
		if (p.exitValue() == 0) {
			Processes processes = serviceProcesses.getProcessesByPid(pid);
			writeInLog("Command Successful==>\n" + command + "\n");
			serviceProcesses.delete(processes);
			flag = true;
		} else {
			
			output.append(p.getErrorStream().toString());
			writeInLog("Command Failure==>\n" + command + "\n" + "Reason==>\n"
					+ output + "\n");
			flag = false;
		}
		return flag;

	}
	public Double convertByteToMb(Long x) {

		Double y = Double.parseDouble("" + (x / 1000000));
		return y;
	}

	public Double convertByteToKb(Double x) {

		Double y = Double.parseDouble("" + (x / 1000));
		return y;
	}

	public Double roundToTwoDecimal(Double x) {
		return Math.round(x * 100.0) / 100.0;
	}

	public String saveInputFile(MultipartFile file, String path) {
		File newFile = new File(path);

		try {
			byte[] dataImage = file.getBytes();
//			System.out.println("yyyyyy+++====>" + dataImage.length);
			FileOutputStream writeStreamImage = new FileOutputStream(newFile);
			BufferedOutputStream bufferStreamImage = new BufferedOutputStream(
					writeStreamImage);
			bufferStreamImage.write(dataImage);
			bufferStreamImage.close();
			writeStreamImage.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return newFile.getAbsolutePath();
	}

	public Double getRam() throws Exception {
		JavaRunCommands obj = new JavaRunCommands();

		String command = "grep MemTotal /proc/meminfo";
		String output = obj.executeCommandOnly(command);
		return convertBytesToSuitableUnit(Long.parseLong(output.replaceAll(
				"[^0-9]", ""))) - 1;
	}

	private static DecimalFormat twoDecimalForm = new DecimalFormat("#.##");
	private static final double BYTE = 1024, KB = BYTE, MB = KB * BYTE, GB = MB
			* BYTE;

	public static Double convertBytesToSuitableUnit(long bytes) {
		Double bytesToSuitableUnit = Double.parseDouble(bytes + "");

		if (bytes >= GB) {
			double tempBytes = bytes / GB;
			bytesToSuitableUnit = Double.parseDouble(twoDecimalForm
					.format(tempBytes));
			return bytesToSuitableUnit;
		}

		if (bytes >= MB) {
			double tempBytes = bytes / MB;
			bytesToSuitableUnit = Double.parseDouble(twoDecimalForm
					.format(tempBytes));
			return bytesToSuitableUnit;
		}

		if (bytes >= KB) {
			double tempBytes = bytes / KB;
			bytesToSuitableUnit = Double.parseDouble(twoDecimalForm
					.format(tempBytes));
			return bytesToSuitableUnit;
		}

		return bytesToSuitableUnit;
	}

	public void writeInLog(String cmd) {
		FileWriter fw = null;
		BufferedWriter bw = null;
		PrintWriter out = null;
		try {/*
			File file = new File(Utils.SCRIPT_DIRECTORY_LOG
					+ "genomestationlog.txt");
			fw = new FileWriter(file, true);
			bw = new BufferedWriter(fw);
			out = new PrintWriter(bw);
			out.println(cmd);
			out.close();
			bw.close();
			fw.close();
		*/} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public boolean checkSamtools() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"samtools --version");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
/// print total base count in fa files.usage
	public boolean checkUCSC() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"faSize");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				if(outputString.contains("print total base count in fa files.usage"))
					return true;
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	public boolean checkRSem() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"rsem-calculate-expression --version");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	
	public boolean checkCdhit() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which cdhit-est");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	public boolean checkGenomeCoverageBed() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which genomeCoverageBed");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	
	public boolean checkR() {
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which R");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	
	public boolean checkCufflinks()
	{
		boolean flag = false;
		try 
		{
			Process p = Runtime.getRuntime().exec("which cufflinks");

			BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) 
			{

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(p.getErrorStream()));

			while ((y = reader1.readLine()) != null) 
			{
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) 
			{
				flag = true;
			} 
			else 
			{
				flag = false;
			}
		} 
		catch (Exception e) 
		{
			return false;
		}
		return flag;
	}
	
	public boolean checkBowtie(){
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which bowtie-build");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	public boolean checkBowtie2(){
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which bowtie2-build");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	public boolean checkBWA(){
		boolean flag = false;
		try {

			Process p = Runtime.getRuntime().exec(
					"which bwa");

			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));

			String outputString = "";
			String y = "";

			while ((y = reader.readLine()) != null) {

				outputString = outputString + y;
			}

			BufferedReader reader1 = new BufferedReader(new InputStreamReader(
					p.getErrorStream()));

			while ((y = reader1.readLine()) != null) {
				outputString = outputString + y;
			}
			p.waitFor();

			if (p.exitValue() == 0) {
				flag = true;
			} else {
				flag = false;
			}
		} catch (Exception e) {
			return false;
		}
		return flag;
	}
	public static String getUUID( List<String> uuid_List, String uuid )
	{
		if(uuid_List.contains(uuid))
		{
			uuid = UUID.randomUUID().toString().replaceAll("-", "");
			getUUID(uuid_List, uuid);
		}
		return uuid;
	}
}
