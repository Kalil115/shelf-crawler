package com.shelfcrawler.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddGameshelfItem;
import com.shelfcrawler.dto.UpdateGameshelfItem;
import com.shelfcrawler.entities.Gameshelf;
import com.shelfcrawler.entities.GameshelfItem;
import com.shelfcrawler.entities.ItemStatus;
import com.shelfcrawler.repository.GameshelfItemRepository;
import com.shelfcrawler.repository.GameshelfRepository;

@Service
public class GameshelfItemService {

	@Autowired
	GameshelfItemRepository gameshelfItemRepository;
	
	@Autowired
	GameshelfRepository gameshelfRepository;
	
	
	public List<Gameshelf> updateGameshelfItem(UpdateGameshelfItem updateGameshelfItem) {
		Long currentGameshelfId = updateGameshelfItem.getGameshelfId();
		GameshelfItem newItem = updateGameshelfItem.getGameshelfItem();
		
		Gameshelf currentGameshelf = gameshelfRepository.findById(currentGameshelfId).get();
		GameshelfItem old = gameshelfItemRepository.findById(newItem.getId()).get();
		newItem.setGame(old.getGame());
		newItem.setGameshelf(currentGameshelf);
		newItem.setDateCreated(old.getDateCreated());
		gameshelfItemRepository.save(newItem);
		
		
		List<Gameshelf> res = new ArrayList<>();
		res.add(gameshelfRepository.findById(currentGameshelfId).get());
		return gameshelfRepository.findAllById(Arrays.asList(currentGameshelfId, updateGameshelfItem.getTodoGameshelfId()));
		
	}
	
	public GameshelfItem addGameshelfItem(AddGameshelfItem addgameshelfItem) {
		Gameshelf todoList = gameshelfRepository.findById(addgameshelfItem.getGameshelfId()).get();
		Set<GameshelfItem> existingGameshelfItems = todoList.getGameshelfItems();
		GameshelfItem gameshelfItem = addgameshelfItem.getGameshelfItem();
		gameshelfItem.setGameshelf(todoList);
		
		if(!existingGameshelfItems.contains(gameshelfItem)) {
			return gameshelfItemRepository.save(gameshelfItem);
		}
		return gameshelfItem;
		
	}

	public Gameshelf deleteGameshelfItemOfListingStatus(Long id) {
		GameshelfItem toBeDeleted = gameshelfItemRepository.findById(id).get();
		toBeDeleted.getGameshelf().getId();
		if(toBeDeleted.getStatus() == ItemStatus.LISTING) {
			gameshelfItemRepository.deleteById(id);
		}
		return gameshelfRepository.findById(toBeDeleted.getGameshelf().getId()).get();
	}
}
