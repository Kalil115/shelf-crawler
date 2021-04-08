package com.shelfcrawler.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddBookshelfItem;
import com.shelfcrawler.dto.UpdateBookshelfItem;
import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.entities.ItemStatus;
import com.shelfcrawler.repository.BookshelfItemRepository;
import com.shelfcrawler.repository.BookshelfRepository;

@Service
public class BookshelfItemService {

	@Autowired
	BookshelfItemRepository bookshelfItemRepository;
	
	@Autowired
	BookshelfRepository bookshelfRepository;
	
	
	public List<Bookshelf> updateBookshelfItem(UpdateBookshelfItem updateBookshelfItem) {
		Long currentBookshelfId = updateBookshelfItem.getBookshelfId();
		BookshelfItem newItem = updateBookshelfItem.getBookshelfItem();
		
		Bookshelf currentBookshelf = bookshelfRepository.findById(currentBookshelfId).get();
		BookshelfItem old = bookshelfItemRepository.findById(newItem.getId()).get();
		newItem.setBook(old.getBook());
		newItem.setBookshelf(currentBookshelf);
		newItem.setDateCreated(old.getDateCreated());
		bookshelfItemRepository.save(newItem);
		
		
		List<Bookshelf> res = new ArrayList<>();
		res.add(bookshelfRepository.findById(currentBookshelfId).get());
		return bookshelfRepository.findAllById(Arrays.asList(currentBookshelfId, updateBookshelfItem.getTodoBookshelfId()));
		
	}
	
	public BookshelfItem addBookshelfItem(AddBookshelfItem addbookshelfItem) {
		Bookshelf todoList = bookshelfRepository.findById(addbookshelfItem.getBookshelfId()).get();
		Set<BookshelfItem> existingBookshelfItems = todoList.getBookshelfItems();
		BookshelfItem bookshelfItem = addbookshelfItem.getBookshelfItem();
		bookshelfItem.setBookshelf(todoList);
		
		if(!existingBookshelfItems.contains(bookshelfItem)) {
			return bookshelfItemRepository.save(bookshelfItem);
		}
		return bookshelfItem;
		
	}

	public Bookshelf deleteBookshelfItemOfListingStatus(Long id) {
		BookshelfItem toBeDeleted = bookshelfItemRepository.findById(id).get();
		toBeDeleted.getBookshelf().getId();
		if(toBeDeleted.getStatus() == ItemStatus.LISTING) {
			bookshelfItemRepository.deleteById(id);
		}
		return bookshelfRepository.findById(toBeDeleted.getBookshelf().getId()).get();
	}
}
