package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.TvSeries;
import com.shelfcrawler.repository.TvRepository;

@RestController
@RequestMapping("/tvs")
public class TvController {

	@Autowired
	TvRepository tvRepository;

	@GetMapping
	public Page<TvSeries> findAllTv(@Param("page") Integer page, @Param("size") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return tvRepository.findAll(pageable);
	}

//	@PostMapping
//	public Tv saveTv(@RequestBody Tv tv) {
//		return tvRepository.save(tv);
//	}
//
//	@PutMapping
//	public Tv updateTv(@RequestBody Tv tv) {
//		return tvRepository.save(tv);
//	}
}
