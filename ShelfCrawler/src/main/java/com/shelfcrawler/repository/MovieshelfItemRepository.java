package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.MovieshelfItem;


public interface MovieshelfItemRepository extends JpaRepository<MovieshelfItem, Long>{
	
//	@Query("select bi from BookshelfItem bi where bi.bookshelf.user.id = :userId and status = :status")
//	List<BookshelfItem> findByUserIdAndStatus(Long userId, ItemStatus status);
//	
//	@Query("select bi from BookshelfItem bi where bi.bookshelf.user.id = :userId and status != :status")
//	List<BookshelfItem> findByUserIdAndStatusExcept(Long userId, ItemStatus status);

}
