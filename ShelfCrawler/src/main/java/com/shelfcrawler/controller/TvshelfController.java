package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.dto.AddTvshelf;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.repository.TvshelfRepository;
import com.shelfcrawler.service.TvshelfService;

@CrossOrigin
@RestController
@RequestMapping("/tvshelves")
public class TvshelfController {

	@Autowired
	TvshelfRepository tvshelfRepository;
	
	@Autowired
	TvshelfService tvshelfService;

	@GetMapping
	public List<Tvshelf> findAllTvshelves() {
		return tvshelfRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Tvshelf findByTvshelfId(@PathVariable("id") Long id) {
		return tvshelfRepository.findById(id).get();
	}
	
	@GetMapping("search/findByUserId")
	public List<Tvshelf> findByUserId(@RequestParam("id") Long id) {
		return tvshelfRepository.findByUserId(id);
	}


	@PutMapping("/updateTvshelfGoal/{id}")
	public Tvshelf updateTvshelf(@PathVariable("id") Long id, @RequestBody Tvshelf tvshelf) {
		return tvshelfService.updateTvshelfGoal(tvshelf);
	}
	
	@PostMapping
	public Tvshelf saveTvshelf(@RequestBody AddTvshelf addTvshelf) {
		return tvshelfService.saveTvshelf(addTvshelf);
	}


}
