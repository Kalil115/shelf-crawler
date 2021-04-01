package com.shelfcrawler.cfg;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class AppConfig implements WebMvcConfigurer{
	        
//	@Value("${allowed.origins}")
//	private String[] allowedOrigins;
//	
//	@Override
//	public void addCorsMappings(CorsRegistry cors) {
//		
//		cors.addMapping("/**").allowedOrigins(allowedOrigins);
//	}
}
