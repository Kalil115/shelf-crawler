package com.shelfcrawler.security.dto;

import java.util.List;

public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Long id;
	private String useername;
	private String email;
	private List<String> roles;

	public JwtResponse(String token,Long id, String useername, String email, List<String> roles) {
		super();
		this.token = token;
		this.id = id;
		this.useername = useername;
		this.email = email;
		this.roles = roles;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUseername() {
		return useername;
	}

	public void setUseername(String useername) {
		this.useername = useername;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

}
