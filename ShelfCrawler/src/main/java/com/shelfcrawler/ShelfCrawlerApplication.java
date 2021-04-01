package com.shelfcrawler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@PropertySource("encryptor.properties")
public class ShelfCrawlerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShelfCrawlerApplication.class, args);
	}

}
