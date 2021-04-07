package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.UpdateBookshelfItem;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.repository.BookshelfItemRepository;
import com.shelfcrawler.repository.BookshelfRepository;

@Service
public class BookshelfItemService {

	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	@Autowired
	BookshelfRepository bookshelfRepository;
	
	
	public BookshelfItem updateBookshelfItem(UpdateBookshelfItem updateBookshelfItem) {
		Long bookshelfId = updateBookshelfItem.getBookshelfId();
		BookshelfItem newItem = updateBookshelfItem.getBookshelfItem();
		Bookshelf bookshelf = bookshelfRepository.findById(bookshelfId).get();
		BookshelfItem old = bookshelfItemRepository.findById(newItem.getId()).get();
		
		newItem.setBook(old.getBook());
		newItem.setBookshelf(bookshelf);
		newItem.setDateCreated(old.getDateCreated());
		return bookshelfItemRepository.save(newItem);
		
	}
}
