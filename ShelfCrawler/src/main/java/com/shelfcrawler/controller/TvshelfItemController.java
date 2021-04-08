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

import com.shelfcrawler.dto.AddTvshelfItem;
import com.shelfcrawler.dto.UpdateTvshelfItem;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.entities.TvshelfItem;
import com.shelfcrawler.repository.TvshelfItemRepository;
import com.shelfcrawler.service.TvshelfItemService;

@RestController
@RequestMapping("/tvshelfItems")
public class TvshelfItemController {
	
	@Autowired
	TvshelfItemRepository tvshelfItemRepository;
	
	@Autowired
	TvshelfItemService tvshelfItemService; 
	
	@GetMapping("/{id}")
	public TvshelfItem findById(@PathVariable("id") Long tvshelfItemId) {
		return tvshelfItemRepository.findById(tvshelfItemId).get();
	}

	@PutMapping("/{id}")
	public List<Tvshelf> updateTvshelfItem(@PathVariable("id") Long id, @RequestBody UpdateTvshelfItem updateTvshelfItem) {
		List<Tvshelf> res = tvshelfItemService.updateTvshelfItem(updateTvshelfItem);
		return res;
	}

	@PostMapping
	public TvshelfItem addTvshelfItem(@RequestBody AddTvshelfItem addtvshelfItem) {
		return tvshelfItemService.addTvshelfItem(addtvshelfItem);
	}
	
	@DeleteMapping("/{id}")
	public Tvshelf deleteTvshelfItemOfListingStatus(@PathVariable("id") Long id) {
		return tvshelfItemService.deleteTvshelfItemOfListingStatus(id);
	}
}
