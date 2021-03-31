package com.shelfcrawler.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddBookWrapper;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.repository.BookshelfRepository;

@Service
public class AddBookServiceImpl implements AddBookService {

	@Autowired
	BookshelfRepository bookshelfRepository;

	@Override
	@Transactional
	public ResponseEntity<?> addBook(AddBookWrapper addBookWrapper) {

		Long bookshelf_id = addBookWrapper.getBookshelf_id();
		Bookshelf bookshelf = bookshelfRepository.findById(bookshelf_id).get();
		bookshelf.add(addBookWrapper.getBookshelfItem());
		
		return ResponseEntity.ok("book added");
	}

}
