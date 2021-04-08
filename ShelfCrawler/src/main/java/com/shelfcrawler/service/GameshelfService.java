package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddGameshelf;
import com.shelfcrawler.entities.Gameshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.GameshelfRepository;
import com.shelfcrawler.repository.UserRepository;

@Service
public class GameshelfService {
	

	@Autowired
	GameshelfRepository gameshelfRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	public Gameshelf saveGameshelf(AddGameshelf addgameshelf) {
		User user = userRepository.findById(addgameshelf.getUserId()).get();
		Gameshelf newGameshelf = new Gameshelf();
		newGameshelf.setName(addgameshelf.getGameshelf().getName());
		newGameshelf.setGoal(addgameshelf.getGameshelf().getGoal());
		newGameshelf.setReachRate(0.0);
		newGameshelf.setUser(user);
		return gameshelfRepository.save(newGameshelf);
	
				
	}
	
	public Gameshelf updateGameshelfGoal(Gameshelf gameshelf) {
		
		Gameshelf editgameshelf = gameshelfRepository.findById(gameshelf.getId()).get();
		editgameshelf.setGoal(gameshelf.getGoal());
		editgameshelf.setReachRate(gameshelf.getReachRate());
		
		return gameshelfRepository.save(editgameshelf);
	
	}
}
