package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Tvshelf;

public interface TvshelfRepository extends JpaRepository<Tvshelf, Long> {

	List<Tvshelf> findByUserId(Long id);
	
	List<Tvshelf> findByUserUsername(String username);

}
