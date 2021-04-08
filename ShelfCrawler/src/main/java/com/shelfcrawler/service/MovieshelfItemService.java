package com.shelfcrawler.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddMovieshelfItem;
import com.shelfcrawler.dto.UpdateMovieshelfItem;
import com.shelfcrawler.entities.ItemStatus;
import com.shelfcrawler.entities.Movieshelf;
import com.shelfcrawler.entities.MovieshelfItem;
import com.shelfcrawler.repository.MovieshelfItemRepository;
import com.shelfcrawler.repository.MovieshelfRepository;

@Service
public class MovieshelfItemService {

	@Autowired
	MovieshelfItemRepository movieshelfItemRepository;
	
	@Autowired
	MovieshelfRepository movieshelfRepository;
	
	
	public List<Movieshelf> updateMovieshelfItem(UpdateMovieshelfItem updateMovieshelfItem) {
		Long currentMovieshelfId = updateMovieshelfItem.getMovieshelfId();
		MovieshelfItem newItem = updateMovieshelfItem.getMovieshelfItem();
		
		Movieshelf currentMovieshelf = movieshelfRepository.findById(currentMovieshelfId).get();
		MovieshelfItem old = movieshelfItemRepository.findById(newItem.getId()).get();
		newItem.setMovie(old.getMovie());
		newItem.setMovieshelf(currentMovieshelf);
		newItem.setDateCreated(old.getDateCreated());
		movieshelfItemRepository.save(newItem);
		
		
		List<Movieshelf> res = new ArrayList<>();
		res.add(movieshelfRepository.findById(currentMovieshelfId).get());
		return movieshelfRepository.findAllById(Arrays.asList(currentMovieshelfId, updateMovieshelfItem.getTodoMovieshelfId()));
		
	}
	
	public MovieshelfItem addMovieshelfItem(AddMovieshelfItem addmovieshelfItem) {
		Movieshelf todoList = movieshelfRepository.findById(addmovieshelfItem.getMovieshelfId()).get();
		Set<MovieshelfItem> existingMovieshelfItems = todoList.getMovieshelfItems();
		MovieshelfItem movieshelfItem = addmovieshelfItem.getMovieshelfItem();
		movieshelfItem.setMovieshelf(todoList);
		
		if(!existingMovieshelfItems.contains(movieshelfItem)) {
			return movieshelfItemRepository.save(movieshelfItem);
		}
		return movieshelfItem;
		
	}

	public Movieshelf deleteMovieshelfItemOfListingStatus(Long id) {
		MovieshelfItem toBeDeleted = movieshelfItemRepository.findById(id).get();
		toBeDeleted.getMovieshelf().getId();
		if(toBeDeleted.getStatus() == ItemStatus.LISTING) {
			movieshelfItemRepository.deleteById(id);
		}
		return movieshelfRepository.findById(toBeDeleted.getMovieshelf().getId()).get();
	}
}
