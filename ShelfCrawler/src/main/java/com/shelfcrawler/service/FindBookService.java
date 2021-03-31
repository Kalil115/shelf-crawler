package com.shelfcrawler.service;

import java.util.List;

import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.BookshelfItem;

public interface FindBookService {

	List<Bookshelf> findByUserId(Long id);

	List<BookshelfItem> findByStatusAndUserId(String status, Long userId);

}
