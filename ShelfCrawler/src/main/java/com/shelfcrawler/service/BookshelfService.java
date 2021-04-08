package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddBookshelf;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.repository.UserRepository;

@Service
public class BookshelfService {
	
	@Autowired
	BookshelfRepository bookshelfRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	public Bookshelf saveBookshelf(AddBookshelf addbookshelf) {
		User user = userRepository.findById(addbookshelf.getUserId()).get();
		Bookshelf newBookshelf = new Bookshelf();
		newBookshelf.setName(addbookshelf.getBookshelf().getName());
		newBookshelf.setGoal(addbookshelf.getBookshelf().getGoal());
		newBookshelf.setReachRate(0.0);
		newBookshelf.setUser(user);
		return bookshelfRepository.save(newBookshelf);
	}
	
	public Bookshelf updateBookshelfGoal(Bookshelf bookshelf) {
		
		Bookshelf editbookshelf = bookshelfRepository.findById(bookshelf.getId()).get();
		editbookshelf.setGoal(bookshelf.getGoal());
		editbookshelf.setReachRate(bookshelf.getReachRate());
		
		return bookshelfRepository.save(editbookshelf);
		
	}

}
