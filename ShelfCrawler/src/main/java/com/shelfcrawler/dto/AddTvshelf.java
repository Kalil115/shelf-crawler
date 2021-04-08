package com.shelfcrawler.dto;

import com.shelfcrawler.entities.Tvshelf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddTvshelf {
	
	private Long userId;
	private Tvshelf tvshelf;

}
