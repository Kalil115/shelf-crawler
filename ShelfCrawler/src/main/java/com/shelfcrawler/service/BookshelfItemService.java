package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.repository.BookshelfItemRepository;

@Service
public class BookshelfItemService {

	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	
	public BookshelfItem updateBookshelfItem(BookshelfItem bookshelfItem) {
		BookshelfItem old = bookshelfItemRepository.findById(bookshelfItem.getId()).get();
		bookshelfItem.setBook(old.getBook());
		bookshelfItem.setBookshelf(old.getBookshelf());
		bookshelfItem.setDateCreated(old.getDateCreated());
		return bookshelfItemRepository.save(bookshelfItem);
		
	}
}
