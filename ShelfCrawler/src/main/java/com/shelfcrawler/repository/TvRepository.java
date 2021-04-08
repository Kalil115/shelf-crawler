package com.shelfcrawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shelfcrawler.entities.TvSeries;

public interface TvRepository extends JpaRepository<TvSeries, Long> {

}
