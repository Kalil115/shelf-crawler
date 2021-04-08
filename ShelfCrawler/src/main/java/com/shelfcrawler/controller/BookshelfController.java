package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.AddBookshelf;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.service.AddBookService;
import com.shelfcrawler.service.BookshelfService;
import com.shelfcrawler.service.FindBookService;

@CrossOrigin
@RestController
@RequestMapping("/bookshelves")
public class BookshelfController {

	@Autowired
	BookshelfRepository bookshelfRepository;

	@Autowired
	AddBookService addBookService;
	
	@Autowired
	FindBookService findBookService;
	
	@Autowired
	BookshelfService bookshelfService;

	@GetMapping
	public List<Bookshelf> findAllBookshelves() {
		return bookshelfRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Bookshelf findByBookshelfId(@PathVariable("id") Long id) {
		return bookshelfRepository.findById(id).get();
	}
	
	@GetMapping("search/findByUserId")
	public List<Bookshelf> findByUserId(@RequestParam("id") Long id) {
		return findBookService.findByUserId(id);
	}
	
	
//	@GetMapping("search/findByUsername")
//	public List<Bookshelf> findByUsername(@RequestParam("username") String username) {
//		return bookshelfRepository.findByUserUsername(username);
//	}
//	
//	@GetMapping("/books/search/findByStatusAndUserId")
//	public List<BookshelfItem> findByStatusAndUserId(@RequestParam("status") String status, @RequestParam("userId") Long userId) {
//		return findBookService.findByStatusAndUserId(status, userId);
//	}

	@PostMapping
	public Bookshelf saveBookshelf(@RequestBody AddBookshelf addBookshelf) {
		return bookshelfService.saveBookshelf(addBookshelf);
	}

	@PutMapping("/updateBookshelfGoal/{id}")
	public Bookshelf updateBookshelf(@PathVariable("id") Long id, @RequestBody Bookshelf bookshelf) {
		return bookshelfService.updateBookshelfGoal(bookshelf);
	}

//	@PostMapping("/addbook")
//	public ResponseEntity<?> addbook(@RequestBody AddBookWrapper newBook) {
//		return addBookService.addBook(newBook);
//	}

}
