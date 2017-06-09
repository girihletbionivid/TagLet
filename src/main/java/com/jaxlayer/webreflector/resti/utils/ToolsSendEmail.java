package com.jaxlayer.webreflector.resti.utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class ToolsSendEmail {
	private Boolean flag = false;

	public Boolean send(String to, String userName,String userPassword,String toolsRequired) {
		// Recipient's email ID needs to be mentioned.

		// Sender's email ID needs to be mentioned
		String from = "werulkaryogesh@gmail.com";
		final String username = "werulkaryogesh@gmail.com";// change accordingly
		final String password = "yogesh9850151761";// change accordingly

		// Assuming you are sending email through relay.jangosmtp.net
		String host = "smtp.gmail.com";

		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", "25");

		// Get the Session object.
		Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});
		session.setDebug(true);
		try {
			// Create a default MimeMessage object.
			Message message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(from));

			// Set To: header field of the header.
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(to));

			// Set Subject: header field
			message.setSubject("REG:SQIT_TOOLS_NOT_PRESENT");

			// Now set the actual message
			message.setText(toolsRequired);

			// Send message
			Transport.send(message);

			System.out.println("Sent message successfully....");
			flag = true;
		} catch (MessagingException e) {
			throw new RuntimeException(e);

		}
		return flag;
	}
}