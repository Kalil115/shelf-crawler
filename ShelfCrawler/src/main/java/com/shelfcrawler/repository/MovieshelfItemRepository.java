package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.MovieshelfItem;


public interface MovieshelfItemRepository extends JpaRepository<MovieshelfItem, Long>{

}
