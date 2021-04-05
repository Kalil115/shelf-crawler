package com.shelfcrawler.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Movieshelf;
import com.shelfcrawler.repository.MovieshelfRepository;

@RestController
@RequestMapping("/movieshelves")
public class MovieshelfController {

	@Autowired
	MovieshelfRepository movieshelfRepository;

	@GetMapping("search/findByUserId")
	public List<Movieshelf> findByUserId(@RequestParam("id") Long id) {
		return movieshelfRepository.findByUserId(id);
	}
	


}
