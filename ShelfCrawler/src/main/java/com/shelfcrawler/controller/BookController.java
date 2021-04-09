package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Book;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.repository.BookRepository;

@RestController
@RequestMapping("/books")
public class BookController {

	@Autowired
	BookRepository bookRepository;

	@GetMapping
	public Page<Book> findAllBook(@Param("page") Integer page, @Param("size") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return bookRepository.findAll(pageable);
	}
	
	@GetMapping("/{id}")
	public Book findOneBook(@PathVariable("id") Long id) {
		return bookRepository.findById(id).get();
	}
	
	
	@PutMapping("/{id}")
	public Book updateBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}

	@PostMapping
	public Book saveBook(@RequestBody Book book) {
		return bookRepository.save(book);
	}

	
}
