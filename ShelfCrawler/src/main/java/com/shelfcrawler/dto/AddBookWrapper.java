package com.shelfcrawler.dto;

import com.shelfcrawler.entities.BookshelfItem;

import lombok.Data;

@Data
public class AddBookWrapper {
	private Long bookshelf_id;
	private BookshelfItem bookshelfItem;
}
