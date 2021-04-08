package com.shelfcrawler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shelfcrawler.entities.Game;
import com.shelfcrawler.repository.GameRepository;

@RestController
@RequestMapping("/games")
public class GameController {

	@Autowired
	GameRepository gameRepository;

	@GetMapping
	public Page<Game> findAllGame(@Param("page") Integer page, @Param("size") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return gameRepository.findAll(pageable);
	}


}
