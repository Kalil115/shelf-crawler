package com.shelfcrawler.dto;

import com.shelfcrawler.entities.MovieshelfItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMovieshelfItem {
	
	private Long movieshelfId;
	private MovieshelfItem movieshelfItem;

}
