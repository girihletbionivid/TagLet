package com.jaxlayer.webreflector.resti.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONObject;

public class MultiFolderReading {

	public Boolean checkNoOfFiles(String filename, JSONObject json3,
			String extensions) throws Exception {
		Boolean flag = false;
		ArrayList<String> aList = new ArrayList<String>(
				Arrays.asList(extensions.split(",")));
		File dir = new File(filename);
		File files[] = dir.listFiles();
	 System.out.println("filename==>" + files.length);
		

		Map<String, String> fileMap = new HashMap<String, String>();
		Map<String, String> folderMap = new HashMap<String, String>();

		if (files != null && files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				if (files[i].isFile()

				) {

					fileMap.put(files[i].getName(),
							"" + files[i].getAbsolutePath());

				} else if (files[i].isDirectory()) {
					folderMap.put(files[i].getName(),
							"" + files[i].getAbsolutePath());
					// JSONObject json2 = new JSONObject();
					// json3.put(files[i].getName(),
					// files[i].getAbsoluteFile());
					// checkNoOfFiles(files[i].getAbsolutePath(), json2,
					// extensions);
				}
			}
			flag = true;
		}
		File fileGenomeDb=new File(Utils.SCRIPT_DIRECTORY_SYS + "/TestData");
		
		if(!fileGenomeDb.exists()){
			fileGenomeDb.mkdir();
		}
		folderMap.put("TestData", Utils.SCRIPT_DIRECTORY_SYS + "/TestData");

		json3.put("file", fileMap);
		json3.put("folder", folderMap);

		// System.out.println(fileMap.toString()+"99999999999===>"+json3.toString());
		return flag;
	}

	public Boolean getSubFiles(String filename, JSONObject json3,
			String extensions) throws Exception {
		Boolean flag = false;
		ArrayList<String> aList = new ArrayList<String>(
				Arrays.asList(extensions.split(",")));
		File dir = new File(filename);

		// System.out.println("filename==>" + filename);
		File files[] = dir.listFiles();

		Map<String, String> fileMap = new HashMap<String, String>();
		Map<String, String> folderMap = new HashMap<String, String>();

		if (files != null && files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				if (files[i].isFile()
				/* && aList.contains(getFileExtension(files[i])) */
				/*
				 * && getFileExtension(files[i]).contains( "" + aList.get(0))
				 */

				) {

					fileMap.put(files[i].getName(),
							"" + files[i].getAbsolutePath());

				} else if (files[i].isDirectory()) {
					folderMap.put(files[i].getName(),
							"" + files[i].getAbsolutePath());
					// JSONObject json2 = new JSONObject();
					// json3.put(files[i].getName(),
					// files[i].getAbsoluteFile());
					// checkNoOfFiles(files[i].getAbsolutePath(), json2,
					// extensions);
				}
			}
			flag = true;
		}

		json3.put("file", fileMap);
		json3.put("folder", folderMap);

		// System.out.println(fileMap.toString()+"99999999999===>"+json3.toString());
		return flag;
	}

	public static Boolean validateFile(String filePath) {
		File file = new File(filePath);
		if (file.exists() && file.isFile() && (file.length() != 0)) {
			return true;
		} else {
			return false;
		}
	}

	public static Boolean validateFileSize(String filePath) {
		File file = new File(filePath);
		if (file.length() != 0) {
			return true;
		} else {
			return false;
		}
	}

	public static void writeInLogFile(String log) {
		File fileLog = new File(Utils.PLATEFORM_DIR + "genomelog.txt");
		try {
			if (!fileLog.exists()) {
				fileLog.createNewFile();
			}
			FileWriter fw = new FileWriter(fileLog);
			fw.write(log);
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	public String getFileNameInDirectoryForGenomeFile(String fileName, String dirName) {
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) 
			{
				if ((files[i].getName() + "." + files[i].getName().substring(
						files[i].getName().lastIndexOf(".") + 1)).endsWith(fileName)) 
				{
					System.out.println("file " + i + " is "
						+ files[i].getName());
					return files[i].getName();
				}
			}
		}
		return "not_found";
	}
	public Boolean checkNoOfFilesWithoutExtension(String filename,
			JSONObject json3, String extensions) throws Exception {
		Boolean flag = false;

		File dir = new File(filename);

		System.out.println("filename==>" + filename);
		File files[] = dir.listFiles();// files array stores the list of files

		if (files != null && files.length > 0) {
			for (int i = 0; i < files.length; i++) {
				if (files[i].isFile()) {
					json3.put(files[i].getName(), files[i].getAbsoluteFile());
				} else if (files[i].isDirectory()) {
					// JSONObject json2 = new JSONObject();
					json3.put(files[i].getName(), files[i].getAbsoluteFile());
					// checkNoOfFiles(files[i].getAbsolutePath(), json2,
					// extensions);
				}
			}
			flag = true;
		}
		return flag;
	}

	private static String getFileExtension(File file) {
		String name = file.getName();
		try {
			System.out.println("dddddddddd"
					+ name.substring(name.lastIndexOf(".") + 1));
			return name.substring(name.lastIndexOf(".") + 1);
		} catch (Exception e) {
			return "";
		}
	}

	String fullPath = "";

	public String getFullPathOfDirectory(String filename, String directoryName) {

		File dir = new File(filename);
		File files[] = dir.listFiles();// files array stores the list of files

		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				// System.out.println("Directory::" + files[i].getName());

				// JSONObject json2 = new JSONObject();
				// System.out.println();
				// json3.put(files[i].getName(),json2);
				// checkNoOfFiles(files[i].getAbsolutePath(),json2,extensions);
				if (files[i].getName().equals(directoryName)) {
					// System.out.println("===ddd?>"+files[i].getName());
					fullPath = files[i].getAbsolutePath();
					System.out.println("===?>" + fullPath);
				}
				getFullPathOfDirectory(files[i].getAbsolutePath(),
						directoryName);
			}
		}
		return fullPath;
	}

	public List<String> getAllFilesOfDirectory(String directoryName) {
		List<String> listOfFilePath = new ArrayList<String>();
		File dir = new File(directoryName);
		if (dir.exists() && dir.listFiles().length != 0) {
			File files[] = dir.listFiles();// files array stores the list of
											// files
			for (int i = 0; i < files.length; i++) {
				if (!files[i].isDirectory()) {
					if (files[i].getName().contains("_Barcode_Labled")) {

						listOfFilePath.add(files[i].getAbsolutePath());
					}
				}

			}
		} else {
			System.out.println(dir.exists() + ".." + dir.listFiles().length
					+ "file is empty" + directoryName);
		}
		return listOfFilePath;
	}
	public List<String> getAllFilesOfDirectoryAll(String directoryName) {
		List<String> listOfFilePath = new ArrayList<String>();
		File dir = new File(directoryName);
		if (dir.exists() && dir.listFiles().length != 0) {
			File files[] = dir.listFiles();// files array stores the list of
											// files
			for (int i = 0; i < files.length; i++) {
				if (!files[i].isDirectory()) {
				

						listOfFilePath.add(files[i].getAbsolutePath());
					
				}

			}
		} else {
			System.out.println(dir.exists() + ".." + dir.listFiles().length
					+ "file is empty" + directoryName);
		}
		return listOfFilePath;
	}
	public Boolean isFileExitInDirectory(String fileName, String dirName) {
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) {
				if (files[i].getName().equals(fileName)) {
					return true;
				}
			}
		}
		return false;
	}

	public static Boolean isFileExitInDirectoryByExtension(String fileName,
			String dirName) {
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) {
				if (getFileExtension(files[i]).equals(fileName)) {
					return true;
				}
			}
		}
		return false;
	}

	/*
	 * public String getFilePathFromDirByExtension(String extention, String
	 * dirName) { File dir = new File(dirName); String y=""; File files[] =
	 * dir.listFiles(); for (int i = 0; i < files.length; i++) { if
	 * (!files[i].isDirectory()) { if
	 * (FilenameUtils.getExtension(files[i].getAbsolutePath
	 * ()).contains(extention)) { y= files[i].getAbsolutePath(); } } } return y;
	 * }
	 */
	public List<String> getFileNameInDirectorys(String fileName, String dirName) {
		List<String> listOfFiles = new ArrayList<String>();
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) {
				if ((files[i].getName() + "." + files[i].getName().substring(
						files[i].getName().lastIndexOf(".") + 1))
						.contains(fileName)) {
					listOfFiles.add(files[i].getName());
				}
			}
		}
		return listOfFiles;
	}

	/*
	 * public String getFileNameInDirectory(String fileName, String dirName) {
	 * File dir = new File(dirName); File files[] = dir.listFiles(); for (int i
	 * = 0; i < files.length; i++) { if (!files[i].isDirectory()) { if
	 * (files[i].getName().contains(fileName)) {
	 * System.out.println("file ===="+i+"======>"+files[i].getName()); return
	 * files[i].getName(); } } } return "not_found"; }
	 */
	public String getFileNameInDirectoryByExtenstion(String fileName,
			String dirName) {
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) {
				if (files[i].getName()
						.substring(files[i].getName().lastIndexOf(".") + 1)
						.contains(fileName)) {
					System.out.println("file ====" + i + "======>"
							+ files[i].getName());
					return files[i].getName();
				}
			}
		}
		return "not_found";
	}

	public String getFileNameInDirectory(String fileName, String dirName) {
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		if(files !=null){
		for (int i = 0; i < files.length; i++) {
			if (!files[i].isDirectory()) {
				if ((files[i].getName() + "." + files[i].getName().substring(
						files[i].getName().lastIndexOf(".") + 1))
						.contains(fileName)) {
					System.out.println("file ====" + i + "======>"
							+ files[i].getName());
					return files[i].getName();
				}
			}
		}
	}
		return "not_found";
	}
	
	public String getFileNameInDirectoryForGenomeIndex(String fileName, String dirName) 
	{
		File dir = new File(dirName);
		File files[] = dir.listFiles();
		
		if(files !=null)
		{
			for (int i = 0; i < files.length; i++) 
			{
				if (!files[i].isDirectory()) 
				{
					Pattern pt = Pattern.compile(fileName);
					Matcher mt = pt.matcher(files[i].getName().substring(
							files[i].getName().lastIndexOf(".")));
					if (mt.find()) 
					{
						System.out.println("file ====" + i + "======>"
							+ files[i].getName());
						return files[i].getName();
					}
				}
			}
		}
		return "not_found";
	}
	
	public static String getParent(String input) {
		File file = new File("" + input);
		String parentPath = file.getAbsoluteFile().getParent();

		return "" + parentPath;
	}

	public String stripExtension(String str) {
		// Handle null case specially.

		if (str == null)
			return null;

		// Get position of last '.'.

		int pos = str.lastIndexOf(".");

		// If there wasn't any '.' just return the string as is.

		if (pos == -1)
			return str;

		// Otherwise return the string, up to the dot.

		return str.substring(0, pos);
	}

	public static Boolean extractStaticData() {
		try {
			java.util.jar.JarFile jarfile = new java.util.jar.JarFile(
					new java.io.File(Utils.CURRENT_WORKING_DIR
							+ "/genomeStation.jar")); // jar
														// file
														// path(here
														// sqljdbc4.jar)

			File fileGlobal = new File(Utils.SCRIPT_DIRECTORY_SYS + "/GenomeDb");
			if (!fileGlobal.exists()) {
				fileGlobal.mkdir();
			}
			File extractFolder = new File(Utils.EXTRACT_DIRECTORY);
			if (!extractFolder.exists()) {
				extractFolder.mkdir();
				System.out.println("======extracting==to========>"
						+ Utils.EXTRACT_DIRECTORY);

				java.util.Enumeration<java.util.jar.JarEntry> enu = jarfile
						.entries();
				while (enu.hasMoreElements()) {
					String destdir = Utils.EXTRACT_DIRECTORY; // abc is
																// my
																// destination
																// directory
					java.util.jar.JarEntry je = enu.nextElement();

					/*
					 * System.out.println("======extracting=before=========>" +
					 * je.getName());
					 */

					if (je.getName().contains("static/perl_scripts/")
							|| je.getName().contains("static/images/")) {

						System.out.println("======extracting==========>"
								+ je.getName());

						java.io.File fl = new java.io.File(destdir,
								je.getName());
						if (!fl.exists()) {
							fl.getParentFile().mkdirs();
							fl = new java.io.File(destdir, je.getName());
						}
						if (je.isDirectory()) {
							fl.mkdirs();
							continue;
						}
						java.io.InputStream is = jarfile.getInputStream(je);
						java.io.FileOutputStream fo = new java.io.FileOutputStream(
								fl);
						while (is.available() > 0) {
							fo.write(is.read());
						}
						fo.close();
						is.close();
						System.out
								.println("Extraction completed successfully.");
					}
				}
			}
			File fi = new File(Utils.ADD_TEMP);
			if (!fi.exists()) {
				fi.delete();
				fi.mkdir();
			} else {
				fi.mkdir();
			}

			jarfile.close();
		} catch (Exception e) {

			e.printStackTrace();
			return false;
		}

		return true;
	}

	public Float getValueFromPercentage(String s) {
		s = s.replace("%", "");
		Float l = Float.parseFloat(s);
		return l;
	}

	public void checkFilesPresent(String commaSeperatedFilesPaths) throws ExceptionFileNotFound {
		boolean flag = false;

		List<String> listOfFilesPaths = Arrays.asList(commaSeperatedFilesPaths
				.split(","));
		for (int i = 0; i < listOfFilesPaths.size(); i++) {
			String filePath = listOfFilesPaths.get(i);
			if (filePath.contains("/")) {
				File file = new File(listOfFilesPaths.get(i));
				flag = file.exists();

				if (file.isFile()) {
					if (file.length() == 0) {
						/*return flag + ":=>" + file.getAbsolutePath()
								+ " path file is empty";*/
						throw new ExceptionFileNotFound( file.getAbsolutePath()
								+ " path file is empty");
					}
				}
				if (flag == false)
					/*return flag + ":=>" + file.getAbsolutePath()
							+ " path not found";*/
					throw new ExceptionFileNotFound( file.getAbsolutePath()
							+ " path not found");
			}

		}

		/*return flag + "";*/

	}

	public void checkFileFormatBio(String commaSeperatedFilesPaths,
			String format) throws Exception {
		JavaRunCommands jrc = new JavaRunCommands();
		boolean flag = false;

		List<String> listOfFilesPaths = Arrays.asList(commaSeperatedFilesPaths
				.split(","));
		for (int i = 0; i < listOfFilesPaths.size(); i++) {
			String filePath = listOfFilesPaths.get(i);
			if (filePath.contains("/")) {
				File file = new File(listOfFilesPaths.get(i));
				if (file.exists()&&file.isFile()) {
					if (file.length() == 0) {
						throw new ExceptionFileNotFound( file.getAbsolutePath()
								+ " path file is empty");
					} else {
						String fileOuput=jrc.executeCommandOnly(
								Utils.TEST_FILE_FORMAT + " "
										+ file.getAbsolutePath() + " " + format);
						if (!fileOuput.contains("true")) {
							throw new ExceptionFileNotFound( file.getAbsolutePath()
									+ " "+fileOuput);
						} 
					}
				}
			
			}

		}

	

	}
	public void checkFileFormatBioForUparse(String commaSeperatedFilesPaths,
			String format) throws Exception {
		JavaRunCommands jrc = new JavaRunCommands();
		boolean flag = false;

		List<String> listOfFilesPaths = Arrays.asList(commaSeperatedFilesPaths
				.split(","));
		for (int i = 0; i < listOfFilesPaths.size(); i++) {
			String filePath = listOfFilesPaths.get(i);
			if (filePath.contains("/")) {
				File file = new File(listOfFilesPaths.get(i));
				if (file.exists() && file.isFile()) {
					if (file.length() == 0) {
						throw new ExceptionFileNotFound(file.getAbsolutePath()
								+ " path file is empty");
					} else {
						String fileOuput = jrc
								.executeCommandOnly(Utils.TEST_FILE_FORMAT_UPARSE
										+ " "
										+ file.getAbsolutePath()
										+ " "
										+ format);
						if (!fileOuput.contains("true")) {
							throw new ExceptionFileNotFound(
									file.getAbsolutePath() + " " + fileOuput);
						}
					}
				}

			}

		}

	}

}
