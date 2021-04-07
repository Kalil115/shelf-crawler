package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.UpdateBookshelfItem;
import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.repository.BookshelfItemRepository;
import com.shelfcrawler.service.BookshelfItemService;

@RestController
@RequestMapping("/bookshelfItems")
public class BookshelfItemController {
	
	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	@Autowired
	BookshelfItemService bookshelfItemService; 
	
	@GetMapping("/{id}")
	public BookshelfItem findById(@PathVariable("id") Long bookshelfItemId) {
		return bookshelfItemRepository.findById(bookshelfItemId).get();
	}

	@PutMapping("/{id}")
	public BookshelfItem updateBookshelfItem(@PathVariable("id") Long id, @RequestBody UpdateBookshelfItem updateBookshelfItem) {
		return bookshelfItemService.updateBookshelfItem(updateBookshelfItem);
	}
}
