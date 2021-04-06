package com.shelfcrawler.dto;

import com.shelfcrawler.entities.Bookshelf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBookshelf {
	
	private Long userId;
	private Bookshelf bookshelf;

}
