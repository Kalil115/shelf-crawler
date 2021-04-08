package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddMovieshelf;
import com.shelfcrawler.entities.Movieshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.MovieshelfRepository;
import com.shelfcrawler.repository.UserRepository;

@Service
public class MovieshelfService {
	
	@Autowired
	MovieshelfRepository movieshelfRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	public Movieshelf saveMovieshelf(AddMovieshelf addmovieshelf) {
		User user = userRepository.findById(addmovieshelf.getUserId()).get();
		Movieshelf newMovieshelf = new Movieshelf();
		newMovieshelf.setName(addmovieshelf.getMovieshelf().getName());
		newMovieshelf.setGoal(addmovieshelf.getMovieshelf().getGoal());
		newMovieshelf.setReachRate(0.0);
		newMovieshelf.setUser(user);
		return movieshelfRepository.save(newMovieshelf);
	}
	
	public Movieshelf updateMovieshelfGoal(Movieshelf movieshelf) {
		
		Movieshelf editmovieshelf = movieshelfRepository.findById(movieshelf.getId()).get();
		editmovieshelf.setGoal(movieshelf.getGoal());
		editmovieshelf.setReachRate(movieshelf.getReachRate());
		
		return movieshelfRepository.save(editmovieshelf);
		
	}

}