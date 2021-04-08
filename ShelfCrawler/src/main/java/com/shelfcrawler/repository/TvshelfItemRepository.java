package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shelfcrawler.entities.TvshelfItem;
import com.shelfcrawler.entities.ItemStatus;


public interface TvshelfItemRepository extends JpaRepository<TvshelfItem, Long>{
	
	@Query("select bi from TvshelfItem bi where bi.tvshelf.user.id = :userId and status = :status")
	List<TvshelfItem> findByUserIdAndStatus(Long userId, ItemStatus status);
	
	@Query("select bi from TvshelfItem bi where bi.tvshelf.user.id = :userId and status != :status")
	List<TvshelfItem> findByUserIdAndStatusExcept(Long userId, ItemStatus status);

}
