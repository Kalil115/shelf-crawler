package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
