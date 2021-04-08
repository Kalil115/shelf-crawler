package com.shelfcrawler.dto;

import com.shelfcrawler.entities.Gameshelf;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddGameshelf {
	
	private Long userId;
	private Gameshelf gameshelf;

}
