package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.dto.AddTvshelf;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.TvshelfRepository;
import com.shelfcrawler.repository.UserRepository;

@Service
public class TvshelfService {
	
	@Autowired
	TvshelfRepository tvshelfRepository;
	
	@Autowired
	UserRepository userRepository;
	
	
	public Tvshelf saveTvshelf(AddTvshelf addtvshelf) {
		User user = userRepository.findById(addtvshelf.getUserId()).get();
		Tvshelf newTvshelf = new Tvshelf();
		newTvshelf.setName(addtvshelf.getTvshelf().getName());
		newTvshelf.setGoal(addtvshelf.getTvshelf().getGoal());
		newTvshelf.setReachRate(0.0);
		newTvshelf.setUser(user);
		return tvshelfRepository.save(newTvshelf);
	
				
	}
	
	public Tvshelf updateTvshelfGoal(Tvshelf tvshelf) {
		
		Tvshelf edittvshelf = tvshelfRepository.findById(tvshelf.getId()).get();
		edittvshelf.setGoal(tvshelf.getGoal());
		edittvshelf.setReachRate(tvshelf.getReachRate());
		
		return tvshelfRepository.save(edittvshelf);
	
	}

}
