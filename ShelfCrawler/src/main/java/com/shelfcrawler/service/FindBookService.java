package com.shelfcrawler.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.entities.ItemStatus;
import com.shelfcrawler.repository.BookshelfItemRepository;
import com.shelfcrawler.repository.BookshelfRepository;

@Service
public class FindBookService {

	@Autowired
	BookshelfRepository bookshelfRepository;
	
	
	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	
	public List<Bookshelf> findByUserId(Long id) {
		return bookshelfRepository.findByUserId(id);
	}

	public List<BookshelfItem> findByUserIdAndStatus(Long userId, String status) {
		ItemStatus it = ItemStatus.valueOf(status);
		return bookshelfItemRepository.findByUserIdAndStatus(userId, it);
	}

	public List<BookshelfItem> findByUserIdAndStatusExcept(Long userId, String status) {
		ItemStatus it = ItemStatus.valueOf(status);
		return bookshelfItemRepository.findByUserIdAndStatusExcept(userId, it);
	}

}
