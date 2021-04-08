package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.AddBookshelfItem;
import com.shelfcrawler.dto.UpdateBookshelfItem;
import com.shelfcrawler.entities.Bookshelf;
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
	public List<Bookshelf> updateBookshelfItem(@PathVariable("id") Long id, @RequestBody UpdateBookshelfItem updateBookshelfItem) {
		List<Bookshelf> res = bookshelfItemService.updateBookshelfItem(updateBookshelfItem);
		return res;
	}

	@PostMapping
	public BookshelfItem addBookshelfItem(@RequestBody AddBookshelfItem addbookshelfItem) {
		return bookshelfItemService.addBookshelfItem(addbookshelfItem);
	}
	
	@DeleteMapping("/{id}")
	public Bookshelf deleteBookshelfItemOfListingStatus(@PathVariable("id") Long id) {
		return bookshelfItemService.deleteBookshelfItemOfListingStatus(id);
	}
}
