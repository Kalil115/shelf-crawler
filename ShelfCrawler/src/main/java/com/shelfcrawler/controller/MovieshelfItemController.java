package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.AddMovieshelfItem;
import com.shelfcrawler.dto.UpdateMovieshelfItem;
import com.shelfcrawler.entities.Movieshelf;
import com.shelfcrawler.entities.MovieshelfItem;
import com.shelfcrawler.repository.MovieshelfItemRepository;
import com.shelfcrawler.service.MovieshelfItemService;

@RestController
@RequestMapping("/movieshelfItems")
public class MovieshelfItemController {
	
	@Autowired
	MovieshelfItemRepository movieshelfItemRepository;
	
	@Autowired
	MovieshelfItemService movieshelfItemService; 
	
	@GetMapping("/{id}")
	public MovieshelfItem findById(@PathVariable("id") Long movieshelfItemId) {
		return movieshelfItemRepository.findById(movieshelfItemId).get();
	}

	@PutMapping("/{id}")
	public List<Movieshelf> updateMovieshelfItem(@PathVariable("id") Long id, @RequestBody UpdateMovieshelfItem updateMovieshelfItem) {
		List<Movieshelf> res = movieshelfItemService.updateMovieshelfItem(updateMovieshelfItem);
		return res;
	}

	@PostMapping
	public MovieshelfItem addMovieshelfItem(@RequestBody AddMovieshelfItem addMovieshelfItem) {
		return movieshelfItemService.addMovieshelfItem(addMovieshelfItem);
	}
	
	@DeleteMapping("/{id}")
	public Movieshelf deleteMovieshelfItemOfListingStatus(@PathVariable("id") Long id) {
		return movieshelfItemService.deleteMovieshelfItemOfListingStatus(id);
	}
}
