package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Movie;
import com.shelfcrawler.repository.MovieRepository;

@RestController
@RequestMapping("/movies")
public class MovieController {

	@Autowired
	MovieRepository movieRepository;

	@GetMapping
	public Page<Movie> findAllMovie(@Param("page") Integer page, @Param("size") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return movieRepository.findAll(pageable);
	}

}
