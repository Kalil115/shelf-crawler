package com.shelfcrawler.service;

import org.springframework.http.ResponseEntity;

import com.shelfcrawler.dto.AddBookWrapper;

public interface AddBookService {

	ResponseEntity<?> addBook(AddBookWrapper addbook);

}
