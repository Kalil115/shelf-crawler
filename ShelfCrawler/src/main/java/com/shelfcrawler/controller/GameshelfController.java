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

import com.shelfcrawler.dto.AddGameshelf;
import com.shelfcrawler.entities.Gameshelf;
import com.shelfcrawler.repository.GameshelfRepository;
import com.shelfcrawler.service.GameshelfService;

@CrossOrigin
@RestController
@RequestMapping("/gameshelves")
public class GameshelfController {

	@Autowired
	GameshelfRepository gameshelfRepository;
	
	@Autowired
	GameshelfService gameshelfService;

	@GetMapping
	public List<Gameshelf> findAllGameshelves() {
		return gameshelfRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Gameshelf findByGameshelfId(@PathVariable("id") Long id) {
		return gameshelfRepository.findById(id).get();
	}
	
	@GetMapping("search/findByUserId")
	public List<Gameshelf> findByUserId(@RequestParam("id") Long id) {
		return gameshelfRepository.findByUserId(id);
	}


	@PutMapping("/updateGameshelfGoal/{id}")
	public Gameshelf updateGameshelf(@PathVariable("id") Long id, @RequestBody Gameshelf gameshelf) {
		return gameshelfService.updateGameshelfGoal(gameshelf);
	}
	
	@PostMapping
	public Gameshelf saveGameshelf(@RequestBody AddGameshelf addGameshelf) {
		return gameshelfService.saveGameshelf(addGameshelf);
	}
}
