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
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.service.AddBookService;

@RestController
@RequestMapping("/bookshelves")
public class BookShelfController {

	@Autowired
	BookshelfRepository bookshelfRepository;

	@Autowired
	AddBookService addBookService;

	@GetMapping
	public List<Bookshelf> findAllBookshelves() {
		return bookshelfRepository.findAll();
	}
	
//	@GetMapping("search/findByUserId")
//	public List<Bookshelf> findByUserId(@RequestParam("id") Long id) {
//		return bookshelfRepository.findByUserId(id);
//	}

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
