package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.shelfcrawler.entities.Bookshelf;

public interface BookshelfRepository extends JpaRepository<Bookshelf, Long> {

	List<Bookshelf> findByUserId(Long id);
	
	List<Bookshelf> findByUserUsername(String username);

}
