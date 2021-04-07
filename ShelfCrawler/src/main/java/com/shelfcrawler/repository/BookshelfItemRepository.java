package com.shelfcrawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shelfcrawler.entities.BookshelfItem;
import com.shelfcrawler.entities.ItemStatus;


public interface BookshelfItemRepository extends JpaRepository<BookshelfItem, Long>{
	
	@Query("select bi from BookshelfItem bi where bi.bookshelf.user.id = :userId and status = :status")
	List<BookshelfItem> findByUserIdAndStatus(Long userId, ItemStatus status);
	
	@Query("select bi from BookshelfItem bi where bi.bookshelf.user.id = :userId and status != :status")
	List<BookshelfItem> findByUserIdAndStatusExcept(Long userId, ItemStatus status);

}
