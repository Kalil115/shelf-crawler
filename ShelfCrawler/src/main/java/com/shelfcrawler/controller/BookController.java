package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Book;
import com.shelfcrawler.repository.BookRepository;

@RestController
@RequestMapping("/books")
public class BookController {

//	@Autowired
//	BookRepository bookRepository;

//	@GetMapping
//	public List<Book> findAllBook() {
//		return bookRepository.findAll();
//	}
//
//	@PostMapping
//	public Book saveBook(@RequestBody Book book) {
//		return bookRepository.save(book);
//	}
//
//	@PutMapping
//	public Book updateBook(@RequestBody Book book) {
//		return bookRepository.save(book);
//	}
}
