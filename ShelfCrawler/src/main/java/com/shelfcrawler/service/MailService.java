package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.MailMessage;

@Service
public class MailService {

	@Autowired
	private JavaMailSender javaMailSender;

//	@Autowired
//	public MailService(JavaMailSender javaMailSender) {
//		this.javaMailSender = javaMailSender;
//	}

	public void sendEmail(MailMessage m) throws MailException {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo(m.getEmailAddress());
		mail.setSubject(m.getSubject());
		mail.setText(m.getBodyText());

		javaMailSender.send(mail);
	}
	
}
