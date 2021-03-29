package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.AddBookWrapper;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.service.AddBookService;
import com.shelfcrawler.service.FindBookService;

@RestController
@RequestMapping("/bookshelves")
public class BookShelfController {

	@Autowired
	BookshelfRepository bookshelfRepository;

	@Autowired
	AddBookService addBookService;
	
	@Autowired
	FindBookService findBookService;

	@GetMapping
	public List<Bookshelf> findAllBookshelves() {
		return bookshelfRepository.findAll();
	}
	
	@GetMapping("search/findByUserId")
	public List<Bookshelf> findByUserId(@RequestParam("id") Long id) {
		return findBookService.findByUserId(id);
	}
	
	@GetMapping("/books/search/findByStatusAndUserId")
	public List<BookshelfItem> findByStatusAndUserId(@RequestParam("status") String status, @RequestParam("userId") Long userId) {
		return findBookService.findByStatusAndUserId(status, userId);
	}

	@PostMapping
	public Bookshelf saveBookshelf(@RequestBody Bookshelf bookshelf) {
		return bookshelfRepository.save(bookshelf);
	}

	@PutMapping
	public Bookshelf updateBookshelf(@RequestBody Bookshelf bookshelf) {
		return bookshelfRepository.save(bookshelf);
	}

	@PostMapping("/addbook")
	public ResponseEntity<?> addbook(@RequestBody AddBookWrapper newBook) {
		return addBookService.addBook(newBook);
	}

}
