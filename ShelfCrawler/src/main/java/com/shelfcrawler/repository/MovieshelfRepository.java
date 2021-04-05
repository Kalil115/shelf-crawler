package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Movieshelf;

public interface MovieshelfRepository extends JpaRepository<Movieshelf, Long> {

	List<Movieshelf> findByUserId(Long id);
	
}
