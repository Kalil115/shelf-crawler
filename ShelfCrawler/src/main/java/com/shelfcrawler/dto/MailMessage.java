package com.shelfcrawler.dto;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class MailMessage {

	private String emailAddress;
	private String subject;
	private String bodyText;
	
}
