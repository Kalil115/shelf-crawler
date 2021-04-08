package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Gameshelf;

public interface GameshelfRepository extends JpaRepository<Gameshelf, Long> {

	List<Gameshelf> findByUserId(Long id);
	
	List<Gameshelf> findByUserUsername(String username);

}
