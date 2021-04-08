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

import com.shelfcrawler.dto.AddGameshelfItem;
import com.shelfcrawler.dto.UpdateGameshelfItem;
import com.shelfcrawler.entities.Gameshelf;
import com.shelfcrawler.entities.GameshelfItem;
import com.shelfcrawler.repository.GameshelfItemRepository;
import com.shelfcrawler.service.GameshelfItemService;

@RestController
@RequestMapping("/gameshelfItems")
public class GameshelfItemController {
	
	@Autowired
	GameshelfItemRepository gameshelfItemRepository;
	
	@Autowired
	GameshelfItemService gameshelfItemService; 
	
	@GetMapping("/{id}")
	public GameshelfItem findById(@PathVariable("id") Long gameshelfItemId) {
		return gameshelfItemRepository.findById(gameshelfItemId).get();
	}

	@PutMapping("/{id}")
	public List<Gameshelf> updateGameshelfItem(@PathVariable("id") Long id, @RequestBody UpdateGameshelfItem updateGameshelfItem) {
		List<Gameshelf> res = gameshelfItemService.updateGameshelfItem(updateGameshelfItem);
		return res;
	}

	@PostMapping
	public GameshelfItem addGameshelfItem(@RequestBody AddGameshelfItem addgameshelfItem) {
		return gameshelfItemService.addGameshelfItem(addgameshelfItem);
	}
	
	@DeleteMapping("/{id}")
	public Gameshelf deleteGameshelfItemOfListingStatus(@PathVariable("id") Long id) {
		return gameshelfItemService.deleteGameshelfItemOfListingStatus(id);
	}
}
