package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{

}
