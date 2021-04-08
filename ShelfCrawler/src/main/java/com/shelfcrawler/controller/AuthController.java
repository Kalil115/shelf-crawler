package com.shelfcrawler.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.UserRepository;
import com.shelfcrawler.security.dto.JwtResponse;
import com.shelfcrawler.security.dto.LoginRequest;
import com.shelfcrawler.security.dto.MessageResponse;
import com.shelfcrawler.security.dto.SignupRequest;
import com.shelfcrawler.security.jwt.JwtUtils;
import com.shelfcrawler.security.services.UserDetailsImpl;
import com.shelfcrawler.service.InitshelvesService;
import com.shelfcrawler.service.MailService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	InitshelvesService initshelvesService;
	
	@Autowired
	PasswordEncoder encoder;

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

		 
		User user = userRepository.save(new User(username, password, email, role));
//		mailService.sendWelcomeMail(user);
		
		initshelvesService.addshelves(user);
		
		return ResponseEntity.ok(new MessageResponse("User registered succesfully"));
	}

	@PostMapping
	@RequestMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(authority -> authority.getAuthority()).collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(token, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
				
	}
	
	@GetMapping
	@RequestMapping("/reset")
	public ResponseEntity<?> reset(@Valid @RequestParam("email") String email) {
		if(userRepository.existsByEmail(email)) {
			User user = userRepository.findByEmail(email).get();			
//			mailService.sendResetMail(user);
			return ResponseEntity.ok(new MessageResponse("email sent"));
		}
		
		return ResponseEntity.badRequest().body(new MessageResponse("Cannot find your email address. Please check again."));
	}
}
