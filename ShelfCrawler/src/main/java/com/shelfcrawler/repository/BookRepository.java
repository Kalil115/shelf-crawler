package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long>{

}
