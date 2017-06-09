package com.jaxlayer.webreflector.rest.user.controller;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

import com.jaxlayer.webreflector.resti.utils.Utils;
public class CheckAuthorization {
	private static final String DEFAULT_GATEWAY = "inet addr:";

	public static Boolean checkExternalIpAddress() {
		Boolean flag = false;
		BufferedReader br = null;
		FileReader fr = null;
		try {
			String sCurrentLine;
			br = new BufferedReader(new FileReader(Utils.SCRIPT_DIRECTORY_BIN
					+ ".genomeauth.txt"));
			while ((sCurrentLine = br.readLine()) != null) {
				if (getHardwareAddress().trim().equals(sCurrentLine)) {
					flag = true;
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
				if (fr != null)
					fr.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		
		return flag;

	}
public  static String getpath(){
	String y="";
	try{
		File file = new File(".dir.txt");
		FileReader fr = new FileReader(file);
		BufferedReader in = new BufferedReader(fr);
		y=in.readLine();
		}catch(Exception e){
			e.printStackTrace();
		}
	return y;
}
	public static String getIpAddress() {
		String ip = "127.0.0.1";
		try {
			Process process = Runtime.getRuntime().exec("ifconfig");
			BufferedReader bufferedReader = new BufferedReader(
					new InputStreamReader(process.getInputStream()));
			String line;
			while ((line = bufferedReader.readLine()) != null) {
				if (line.trim().startsWith(DEFAULT_GATEWAY)) {
					if (line.contains("Bcast:")) {
						ip = line.substring(line.indexOf(":") + 1,
								line.indexOf("Bcast:")).trim();
						System.out.println(ip);
						if (ip != "127.0.0.1") {
							return ip;
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("" + e.getMessage() + " " + e.getCause());
		}
		return ip;
	}
	public static String getHardwareAddress() {
		String hardware = "";
		String finalKey = "";
		StringBuilder hardwardkey = new StringBuilder();
		try {
			if (Desktop.isDesktopSupported()) {
				Process process = Runtime.getRuntime().exec("ifconfig");
				BufferedReader bufferedReader = new BufferedReader(
						new InputStreamReader(process.getInputStream()));
				String line;
				while ((line = bufferedReader.readLine()) != null) {
					if (line.trim().contains("HWaddr")) {
						hardware = line.substring(line.indexOf("HWaddr") + 7)
								.trim();
						hardwardkey.append(hardware);
					}
				}
				/*CryptoUtilS cryptoUtil = new CryptoUtilS();
				finalKey = cryptoUtil.encrypt("genomeinfo",
						hardwardkey.toString());*/
				
			}
			// System.out.println(finalKey.toString());
			// System.out.println("de=="+ProtectedConfigFile.decrypt(finalKey));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("" + e.getMessage() + " " + e.getCause());
		}

		return finalKey;
	}
/*	public static String getHardwareAddress() {
		String ip = "localhost";
		String hardware = "";
		try {
			if (Desktop.isDesktopSupported()) {
				Process process = Runtime.getRuntime().exec("ifconfig");
				BufferedReader bufferedReader = new BufferedReader(
						new InputStreamReader(process.getInputStream()));
				String line;
				while ((line = bufferedReader.readLine()) != null) {
					if (line.trim().contains("HWaddr")) {
						hardware = line.substring(line.indexOf("HWaddr") + 7)
								.trim();
					}
					if (line.trim().startsWith(DEFAULT_GATEWAY)) {
						if (line.contains("Bcast:")) {
							ip = line.substring(line.indexOf(":") + 1,
									line.indexOf("Bcast:")).trim();
							System.out.println(hardware);
							System.out.println(ip);
							return hardware;

						}
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("" + e.getMessage() + " " + e.getCause());
		}
		return hardware;
	}*/
}

