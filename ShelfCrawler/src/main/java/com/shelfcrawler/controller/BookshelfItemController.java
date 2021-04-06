package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.repository.BookshelfItemRepository;

@RestController
@RequestMapping("/bookshelfItems")
public class BookshelfItemController {
	
	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	@GetMapping("/{id}")
	public BookshelfItem findById(@PathVariable("id") Long bookshelfItemId) {
		return bookshelfItemRepository.findById(bookshelfItemId).get();
	}

}
