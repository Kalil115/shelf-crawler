package com.shelfcrawler.security.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtResponse {

	private String token;
	private String type;
	private Long id;
	private String useername;
	private String email;
	private List<String> roles;

	public JwtResponse(String token,Long id, String useername, String email, List<String> roles) {
		this.token = token;
		this.type = "Bearer";
		this.id = id;
		this.useername = useername;
		this.email = email;
		this.roles = roles;
	}
	
}
