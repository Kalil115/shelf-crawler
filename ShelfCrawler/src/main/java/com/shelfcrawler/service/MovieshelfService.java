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
	UserRepository userRepository;

	@Autowired
	MovieshelfRepository movieshelfRepository;

	public Movieshelf saveMovieshelf(AddMovieshelf addMovieshelf) {
		User user = userRepository.findById(addMovieshelf.getUserId()).get();
		Movieshelf newshelf = new Movieshelf();
		newshelf.setName(addMovieshelf.getMovieshelf().getName());
		newshelf.setGoal(addMovieshelf.getMovieshelf().getGoal());
		newshelf.setReachRate(0.0);
		newshelf.setUser(user);
		return movieshelfRepository.save(newshelf);
	}

	public Movieshelf updateMovieshelfGoal(Movieshelf movieshelf) {
		Movieshelf editshelf = movieshelfRepository.findById(movieshelf.getId()).get();
		editshelf.setGoal(movieshelf.getGoal());
		editshelf.setReachRate(movieshelf.getReachRate());
		return movieshelfRepository.save(editshelf);

	}
}
