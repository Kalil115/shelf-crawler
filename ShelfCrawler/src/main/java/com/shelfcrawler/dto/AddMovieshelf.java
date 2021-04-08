package com.shelfcrawler.dto;

import com.shelfcrawler.entities.Movieshelf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMovieshelf {
	
	private Long userId;
	private Movieshelf movieshelf;

}
