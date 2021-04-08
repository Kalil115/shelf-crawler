package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.GameshelfItem;


public interface GameshelfItemRepository extends JpaRepository<GameshelfItem, Long>{
	


}
