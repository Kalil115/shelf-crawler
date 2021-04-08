package com.shelfcrawler.dto;

import com.shelfcrawler.entities.BookshelfItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBookshelfItem {
	
	private Long bookshelfId;
	private BookshelfItem bookshelfItem;

}
