package com.shelfcrawler.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.MailMessage;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.UserRepository;
import com.shelfcrawler.security.dto.MessageResponse;
import com.shelfcrawler.security.dto.SignupRequest;
import com.shelfcrawler.security.jwt.JwtUtils;
import com.shelfcrawler.service.MailService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	MailMessage mailMessage;

	@Autowired
	MailService mailService;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping
	@RequestMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
		
		String username = signupRequest.getUsername();
		String password = encoder.encode(signupRequest.getPassword());
		String email = signupRequest.getEmail();
		String role = signupRequest.getRole() == null ? "USER" : signupRequest.getRole();
		

		if (userRepository.existsByUsername(username)) {
			return ResponseEntity.badRequest().body(new MessageResponse("username already exist"));
		}

		if (userRepository.existsByEmail(email)) {
			return ResponseEntity.badRequest().body(new MessageResponse("email already exist"));
		}
		
		User user = new User(username,
				             password,
				             email,
				             role);

		userRepository.save(user);
		
		mailMessage.setEmailAddress(email);
		mailMessage.setSubject("Welcome to Shelf Crawler");
		mailMessage.setBodyText("Hi " + username + ",\n" + "Welcome  to shelf Crawler.");
		
//		try {
//			mailService.sendEmail(mailMessage);
//		}catch(MailException mailException) {
//			System.out.println(mailException);
//		}

		return ResponseEntity.ok(new MessageResponse("User registered succesfully"));

	}

//	@PostMapping
//	@RequestMapping("/login")
//	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
//		
//		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//		
//		SecurityContextHolder.getContext().setAuthentication(authentication);
//		String token = jwtUtils.generateJwtToken(authentication);
//		
//		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
//		
//		return ResponseEntity.ok(new JwtResponse(token, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
//				
//	}
}
