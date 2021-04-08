package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.TvshelfItem;

public interface TvshelfItemRepository extends JpaRepository<TvshelfItem, Long>{

}
