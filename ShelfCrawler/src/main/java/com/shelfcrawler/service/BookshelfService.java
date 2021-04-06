package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.repository.BookshelfRepository;

@Service
public class BookshelfService {
	
	@Autowired
	BookshelfRepository bookshelfRepository;
	
	public Bookshelf updateBookshelfGoal(Bookshelf bookshelf) {
		
		Bookshelf old = bookshelfRepository.findById(bookshelf.getId()).get();
		bookshelf.setUser(old.getUser());
		bookshelfRepository.save(bookshelf);
		return bookshelf;
		
	}

}
