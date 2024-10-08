package com.shelfcrawler.security.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.shelfcrawler.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${shelfcrawler.jwtSecret}")
	private String jwtSecret;
	
	@Value("${shelfcrawler.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String getUserNameFromJwtToken(String authToken) {
		return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken).getBody().getSubject();
	}
	
	public String generateJwtToken(Authentication auth) {
		UserDetails userDetails = (UserDetailsImpl) auth.getPrincipal();
		
		Date expiration = new Date(new Date().getTime() + jwtExpirationMs);
		
		JwtBuilder builder = Jwts.builder()
				.setSubject(userDetails.getUsername())
			    .setIssuedAt(new Date())
			    .setExpiration(expiration)
			    .signWith(SignatureAlgorithm.HS512, jwtSecret);
		
		return builder.compact();
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		}
		return false;
	}

}
