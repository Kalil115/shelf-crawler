package com.shelfcrawler.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shelfcrawler.entities.Bookshelf;
import com.shelfcrawler.entities.Gameshelf;
import com.shelfcrawler.entities.Movieshelf;
import com.shelfcrawler.entities.Tvshelf;
import com.shelfcrawler.entities.User;
import com.shelfcrawler.repository.BookshelfRepository;
import com.shelfcrawler.repository.GameshelfRepository;
import com.shelfcrawler.repository.MovieshelfRepository;
import com.shelfcrawler.repository.TvshelfRepository;

@Service
public class InitshelvesService {

	@Autowired
	BookshelfRepository bookshelfRepository;
	
	@Autowired
	MovieshelfRepository movieshelfRepository;
	
	@Autowired
	TvshelfRepository tvshelfRepository;
	
	@Autowired
	GameshelfRepository gameshelfRepository;
	
	public void addshelves(User user) {
		bookshelfRepository.save(new Bookshelf(user));
		movieshelfRepository.save(new Movieshelf(user));
		tvshelfRepository.save(new Tvshelf(user));
		gameshelfRepository.save(new Gameshelf(user));
	}

}
