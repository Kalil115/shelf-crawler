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
public class FindBookServiceImpl implements FindBookService {

	@Autowired
	BookshelfRepository bookshelfRepository;
	
	
	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	@Override
	public List<Bookshelf> findByUserId(Long id) {
		return bookshelfRepository.findByUserId(id);
	}


	@Override
	public List<BookshelfItem> findByStatusAndUserId(String status, Long userId) {
		ItemStatus it = ItemStatus.valueOf(status);
		return bookshelfItemRepository.findByStatusAndUserId(it, userId);
	}


}
