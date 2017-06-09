package com.jaxlayer.webreflector.rest.user.controller;

import static com.jaxlayer.webreflector.rest.user.controller.JdRequestAccess.addAccessControllAllowOrigin;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

import org.bouncycastle.crypto.modes.SICBlockCipher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.itextpdf.text.log.SysoCounter;
import com.jaxlayer.webreflector.rest.models.User;
import com.jaxlayer.webreflector.rest.response.JdJsonResponse;
import com.jaxlayer.webreflector.rest.service.GsIServiceUser;
import com.jaxlayer.webreflector.resti.utils.JavaRunCommands;
import com.jaxlayer.webreflector.resti.utils.RandomStringGenerator;
import com.jaxlayer.webreflector.resti.utils.SendEmail;
import com.jaxlayer.webreflector.resti.utils.Utils;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
@Controller
public class UserController {
	@Autowired
	private GsIServiceUser serviceUser;

	public static final int ITERATION_NUMBER = 100;
	

	@RequestMapping(value = "/user/check", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<User> getTempAdmin() {
		User user = new User();
		user.setEmailId("yogi@gmail.com");
		user.setPassword("yogi");
		user.setUserId(-1l);

		user.setUserName("yogi");
		ResponseEntity<User> userEntity = new ResponseEntity<User>(user,
				HttpStatus.OK);
		return userEntity;
	}
	@MessageMapping("/questions/{sid}")
	public String questionss(String question,@PathVariable String sid){
		JavaRunCommands rm=new JavaRunCommands();
		/*syso
		rm.executeCommandAllsssssssssss("ping 10.0.0.120");*/
		return ""+question+"===>By "+sid;
	}
	@RequestMapping(value = "/user/get/password", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<User> getPassword(
			@RequestParam("emailId") String emailId) {
		ResponseEntity<User> entity = null;
		User user = null;

		HttpHeaders headers = addAccessControllAllowOrigin();
		try {
			user = serviceUser.getUserLogin(emailId);
			if (user != null) {
				byte[] bSalt = base64ToByte(user.getSalt());
				String password = RandomStringGenerator.generateRandomString(6);
				byte[] proposedDigest = getHash(ITERATION_NUMBER, password,
						bSalt);

				SecurityManager security = System.getSecurityManager();
				SendEmail email = new SendEmail();
				if (email.send(emailId, user.getUserName(), password)) {
					user.setPassword(byteToBase64(proposedDigest));
					serviceUser.update(user);
					entity = new ResponseEntity<User>(user, headers,
							HttpStatus.OK);
				} else {
					entity = new ResponseEntity<User>(user, headers,
							HttpStatus.NOT_FOUND);
				}

			} else {
				entity = new ResponseEntity<User>(user, headers,
						HttpStatus.UNAUTHORIZED);
			}
			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			user.setPassword(e.getMessage() + "==>" + e.getCause());
			entity = new ResponseEntity<User>(user, headers,
					HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/user/change/password", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<User> changePassword(
			@RequestParam("userId") Long userId,
			@RequestParam("newPassword") String newPassword) {
		ResponseEntity<User> entity = null;
		User user = null;

		HttpHeaders headers = addAccessControllAllowOrigin();
		System.out.println(userId + "dddddddddddd");
		try {
			user = serviceUser.getUserById(userId);
			if (user != null) {
				byte[] bSalt = base64ToByte(user.getSalt());
				byte[] proposedDigest = getHash(ITERATION_NUMBER, newPassword,
						bSalt);

				SecurityManager security = System.getSecurityManager();
				System.out.println("Security Manager" + security);
				System.out.println("dddddddssssddddd" + newPassword);
				user.setPassword(byteToBase64(proposedDigest));
				serviceUser.update(user);
				entity = new ResponseEntity<User>(user, headers, HttpStatus.OK);

			} else {
				entity = new ResponseEntity<User>(user, headers,
						HttpStatus.UNAUTHORIZED);
			}
			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			user.setPassword(e.getMessage() + "==>" + e.getCause());
			entity = new ResponseEntity<User>(user, headers,
					HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

	@RequestMapping(value = "/user/register", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<JdJsonResponse> registerUser(@RequestBody User user) 
	{
		ResponseEntity<JdJsonResponse> entity = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		JdJsonResponse response = new JdJsonResponse();
		
		System.out.println(user.toString());
		
		try 
		{
			if (!serviceUser.isUserEmailIdAvailable(user.getEmailId().trim())) 
			{
				if(serviceUser.getUserByUserName(user.getUserName().replaceAll("\\s+", "_").trim()).getUserId()==-1l)
				{
					SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
					byte[] bSalt = new byte[8];
					random.nextBytes(bSalt);
					byte[] bDigest = getHash(ITERATION_NUMBER, user.getPassword(), bSalt);
					String sDigest = byteToBase64(bDigest);
					String sSalt = byteToBase64(bSalt);
					
					System.out.println(Utils.CURRENT_WORKING_DIR + "/users/" +  user.getUserName().replaceAll("\\s+", "_"));
					
					user.setPassword(sDigest);
					user.setSalt(sSalt);
					user.setUserDir(Utils.CURRENT_WORKING_DIR + "/users/" +  user.getUserName().replaceAll("\\s+", "_"));
				
//				if (CheckAuthorization.checkExternalIpAddress()) {

					File file = new File(Utils.CURRENT_WORKING_DIR + "/users/" +  user.getUserName().replaceAll("\\s+", "_"));
					
					if (!file.exists()) 
					{
						if (file.mkdir()) 
						{
							System.out.println("Directory is created!");
							serviceUser.insert(user);
							
							response.setActor("user");
							response.setId(-1l);
							response.setMessage("Registered successfully..!");
							response.setStatus("SUCCESS");
							entity = new ResponseEntity<JdJsonResponse>(
									response, headers, HttpStatus.OK);
						} 
						else 
						{
							response.setActor("user");
							response.setId(-1l);
							response.setMessage("You are not register.!Because "
									+ Utils.CURRENT_WORKING_DIR
									+"/"+ user.getUserName()
									+ " not allowed to create");
							response.setStatus("SUCCESS");
							entity = new ResponseEntity<JdJsonResponse>(
									response, headers, HttpStatus.FORBIDDEN);
						}
					}
					else
					{
						System.out.println("Directory is created!");
						serviceUser.insert(user);
						response.setActor("user");
						response.setId(-1l);
						response.setMessage("Registered successfully..!");
						response.setStatus("SUCCESS");
						entity = new ResponseEntity<JdJsonResponse>(
								response, headers, HttpStatus.OK);
					}
				} 
				else 
				{
					response.setActor("user");
					response.setId(-1l);
					response.setMessage("You are not authorize..!");
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonResponse>(response,
							headers, HttpStatus.FORBIDDEN);
				}

				return entity;
			}
			else
			{
					response.setActor("user");
					response.setId(-1l);
					response.setMessage("Already Registred user name");
					response.setStatus("FAILED");

					entity = new ResponseEntity<JdJsonResponse>(response, headers,
							HttpStatus.FORBIDDEN);
					return entity;
				}
			/*} else {
				response.setActor("user");
				response.setId(-1l);
				response.setMessage("Alread Registred Email Id");
				response.setStatus("FAILED");

				entity = new ResponseEntity<JdJsonResponse>(response, headers,
						HttpStatus.FORBIDDEN);
				return entity;

			}*/
		} catch (Exception e) {
			e.printStackTrace();
			response.setActor("user");
			response.setId(-1l);
			response.setMessage("Exception Occured"+e.getMessage()+e.getCause());
			response.setStatus("FAILED");

			entity = new ResponseEntity<JdJsonResponse>(response, headers,
					HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}
	
	
/*	@RequestMapping(value = "/user/register", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<JdJsonResponse> registerUser(
			
			@RequestParam("userName") String userName,
			
			@RequestParam("designation") String designation,
			@RequestParam("institute") String institute,
			@RequestParam("address") String address,
			
			@RequestParam("email") String email,
			@RequestParam("password") String password,
			@RequestParam("confirmPassword") String confirmPassword,
			
			@RequestParam("userId") long userId
			)
	{
		ResponseEntity<JdJsonResponse> entity = null;
		HttpHeaders headers = addAccessControllAllowOrigin();
		JdJsonResponse response = new JdJsonResponse();
		
		try 
		{
			User user = new User();
			
			if (!serviceUser.isUserEmailIdAvailable(email.trim())) 
			{
				
				if(serviceUser.getUserByUserName(userName.replaceAll("\\s+", "_").trim()).getUserId()==-1l)
				{
					SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
					byte[] bSalt = new byte[8];
					random.nextBytes(bSalt);
					byte[] bDigest = getHash(ITERATION_NUMBER, password, bSalt);
					String sDigest = byteToBase64(bDigest);
					String sSalt = byteToBase64(bSalt);
					
					System.out.println(Utils.CURRENT_WORKING_DIR + "/users/" +  userName.replaceAll("\\s+", "_"));
					
					user.setAddress(address);
					user.setUserName(userName);
					user.setUserId(userId);
					user.setEmailId(email);
					user.setDesignation(designation);
					user.setInstitute(institute);
					user.setAddress(address);
					
					user.setPassword(sDigest);
					user.setSalt(sSalt);
					user.setUserDir(Utils.CURRENT_WORKING_DIR + "/users/" +  user.getUserName().replaceAll("\\s+", "_"));
				
//				if (CheckAuthorization.checkExternalIpAddress()) {

					File file = new File(Utils.CURRENT_WORKING_DIR + "/users/" +  user.getUserName().replaceAll("\\s+", "_"));
					
					if (!file.exists()) 
					{
						if (file.mkdir()) 
						{
							System.out.println("Directory is created!");
							serviceUser.insert(user);
							
							response.setActor("user");
							response.setId(-1l);
							response.setMessage("Registered successfully..!");
							response.setStatus("SUCCESS");
							entity = new ResponseEntity<JdJsonResponse>(
									response, headers, HttpStatus.OK);
						} 
						else 
						{
							response.setActor("user");
							response.setId(-1l);
							response.setMessage("You are not register.!Because "
									+ Utils.CURRENT_WORKING_DIR
									+"/"+ user.getUserName()
									+ " not allowed to create");
							response.setStatus("SUCCESS");
							entity = new ResponseEntity<JdJsonResponse>(
									response, headers, HttpStatus.FORBIDDEN);
						}
					}
					else
					{
						System.out.println("Directory is created!");
						serviceUser.insert(user);
						response.setActor("user");
						response.setId(-1l);
						response.setMessage("Registered successfully..!");
						response.setStatus("SUCCESS");
						entity = new ResponseEntity<JdJsonResponse>(
								response, headers, HttpStatus.OK);
					}
				} 
				else 
				{
					response.setActor("user");
					response.setId(-1l);
					response.setMessage("You are not authorize..!");
					response.setStatus("SUCCESS");
					entity = new ResponseEntity<JdJsonResponse>(response,
							headers, HttpStatus.FORBIDDEN);
				}

				return entity;
			}
			else
			{
					response.setActor("user");
					response.setId(-1l);
					response.setMessage("Already Registred user name");
					response.setStatus("FAILED");

					entity = new ResponseEntity<JdJsonResponse>(response, headers,
							HttpStatus.FORBIDDEN);
					return entity;
				}
			} else {
				response.setActor("user");
				response.setId(-1l);
				response.setMessage("Alread Registred Email Id");
				response.setStatus("FAILED");

				entity = new ResponseEntity<JdJsonResponse>(response, headers,
						HttpStatus.FORBIDDEN);
				return entity;

			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setActor("user");
			response.setId(-1l);
			response.setMessage("Exception Occured"+e.getMessage()+e.getCause());
			response.setStatus("FAILED");

			entity = new ResponseEntity<JdJsonResponse>(response, headers,
					HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}
*/
	
	public static byte[] getHash(int iterationNb, String password, byte[] salt)
			throws NoSuchAlgorithmException {
		MessageDigest digest = MessageDigest.getInstance("SHA-1");
		digest.reset();
		digest.update(salt);
		byte[] input = null;
		try {
			input = digest.digest(password.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		for (int i = 0; i < iterationNb; i++) {
			digest.reset();
			input = digest.digest(input);
		}
		return input;
	}

	/**
	 * From a base 64 representation, returns the corresponding byte[]
	 * 
	 * @param data
	 *            String The base64 representation
	 * @return byte[]
	 * @throws IOException
	 */
	public static byte[] base64ToByte(String data) throws IOException {
		BASE64Decoder decoder = new BASE64Decoder();
		return decoder.decodeBuffer(data);
	}

	/**
	 * From a byte[] returns a base 64 representation
	 * 
	 * @param data
	 *            byte[]
	 * @return String
	 * @throws IOException
	 */
	public static String byteToBase64(byte[] data) {
		
		BASE64Encoder endecoder = new BASE64Encoder();
		return endecoder.encode(data);
	}

	@RequestMapping(value = "/user/login", method = RequestMethod.POST, produces = "application/json", consumes = "application/x-www-form-urlencoded")
	public @ResponseBody ResponseEntity<User> loginUser(
			@RequestParam("emailId") String emailId,
			@RequestParam("password") String password) 
	{
		ResponseEntity<User> entity = null;
		User user = null;

		HttpHeaders headers = addAccessControllAllowOrigin();
		try
		{
			user = serviceUser.getUserLogin(emailId);
			if (user != null) 
			{
				byte[] bSalt = base64ToByte(user.getSalt());
				byte[] bDigest = base64ToByte(user.getPassword());

				// Compute the new DIGEST
				byte[] proposedDigest = getHash(ITERATION_NUMBER, password, bSalt);

				if (Arrays.equals(proposedDigest, bDigest))
				{
					entity = new ResponseEntity<User>(user, headers,
							HttpStatus.OK);
				} else {
					entity = new ResponseEntity<User>(user, headers,
							HttpStatus.NOT_FOUND);
				}
			} else {
				entity = new ResponseEntity<User>(user, headers,
						HttpStatus.UNAUTHORIZED);
			}
			return entity;

		} catch (Exception e) {
			e.printStackTrace();
			entity = new ResponseEntity<User>(user, headers,
					HttpStatus.EXPECTATION_FAILED);
			return entity;
		}

	}

}
