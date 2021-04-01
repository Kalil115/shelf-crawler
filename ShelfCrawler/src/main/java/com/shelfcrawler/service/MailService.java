package com.shelfcrawler.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.MailMessage;
import com.shelfcrawler.entities.User;

@Service
public class MailService {
	private static final Logger logger = LoggerFactory.getLogger(MailService.class);

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private MailMessage mailMessage;

	public void sendEmail(MailMessage m) throws MailException {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(m.getEmailAddress());
		mail.setSubject(m.getSubject());
		mail.setText(m.getBodyText());

		javaMailSender.send(mail);
	}

	public void sendWelcomeMail(User user) {
		mailMessage.setEmailAddress(user.getEmail());
		mailMessage.setSubject("Welcome to Shelf Crawler");
		mailMessage.setBodyText("Hi " + user.getUsername() + ",\n" + "Welcome  to shelf Crawler.");
		
		try {
			sendEmail(mailMessage);
		}catch(MailException mailException) {
			logger.error("Fail to Send Welcome Mail", mailException.getMessage());
		}
	}
	
}
