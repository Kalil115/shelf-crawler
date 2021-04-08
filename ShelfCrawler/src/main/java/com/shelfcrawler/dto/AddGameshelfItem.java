package com.shelfcrawler.dto;

import com.shelfcrawler.entities.GameshelfItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddGameshelfItem {
	
	private Long gameshelfId;
	private GameshelfItem gameshelfItem;

}
